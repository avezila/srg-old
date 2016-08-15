
import * as Cian from "const/Cian"
import Env from "const/Env"
//import fetch from "fetch-ie8"



export async function ApiCall(method,rpcType,request){
  var body = JSON.stringify(rpcType.request(request));

  let response = await new Promise((resolve,reject)=>{
    $.ajax({
      url: `${Env.host}/${Env.base}/${Env.api}/${method}`,
      data: body,
      contentType: 'text/plain',
      headers: { 
         //Accept : "text/html; charset=utf-8",
         //"Content-Type": "text/plain; charset=utf-8",
      },
      type: 'POST',
      // beforeSend: function(req) {
      //   req.setRequestHeader("Accept", "text/plain");
      //   req.setRequestHeader("Content-Type", "text/plain");
      // },
    })
    .done(resolve)
    .fail((jq,msg,e)=>{
      if(!e || e.name != "Error")
        e = new Error(msg + e)
      reject(e);
    })
  });

  if(typeof response == "string")
    response = JSON.parse(response);
  
  // var response = await fetch(`${Env.host}/${Env.base}/${Env.api}/${method}`,{
  //   body : body,
  //   method : "POST",
  //   headers: {
  //     'Content-Type': 'text/plain'
  //   },
  // });
  
  //  if(response.status != 200)
  //    throw new Error("status code: " + response.status);
    
  //  response = await response.json()
  
  return rpcType.response(response);
}



let rpc = {};

for (let name in Cian.Rpc()){
  (function(name){
    rpc[name] = async function(request){
      var result;
      try {
        result = await ApiCall(name,Cian.Rpc[name],request);
      }catch (e){
        result = Cian.Rpc[name].response({
          error : {
            type  : "FETCH",
            e     : e,
          }
        });
        console.error(e.stack || e.message)
      }
      if(result.error.type){
        result.error.msg = result.error.msg || cian.ErrorType.map(result.error.type)
        result.error.msg += ` in ${name}()`;
        let msg = `Failed fetch api ${name} with request:${JSON.stringify(Cian.Rpc[name].request(request),null,2)}`;
        if (result.error.e != undefined){
          result.error.e.message = result.error.e.message || "";
          result.error.e.stack   = result.error.e.stack || "";
          result.error.e.message = `${msg}\n\n${result.error.e.message}\n`;
          result.error.e.message = result.error.e.message.replace(/(http\S+)(\?\S+)/gmi,"$1?...")
          result.error.e.stack = result.error.e.stack.replace(/(http\S+)(\?\S+)/gmi,"$1?...")
        } else {
          result.error.e = new Error(msg)
        }
      }
      return result;
    }
  })(name);
}

export default {...rpc};