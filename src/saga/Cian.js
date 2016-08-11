
import * as Cian from "const/Cian"
import Env from "const/Env"


export async function ApiCall(method,rpcType,request){
  var body = JSON.stringify(rpcType.request(request));
  
  var response = await fetch(`${Env.host}/${Env.base}/${Env.api}/${method}`,{
    method : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body : body,
  })
  
  if(response.status != 200)
    throw new Error("status code: " + response.status);
    
  response = await response.json()

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
      }
      if(result.error.type){
        result.error.msg = result.error.msg || cian.ErrorType.map(result.error.type)
        result.error.msg += ` in ${name}()`;
        let msg = `Failed fetch api ${name} with request:${JSON.stringify(Cian.Rpc[name].request(request),null,2)}`;
        if (result.e != undefined){
          result.error.e.message = `${msg}\n\n${result.error.e.message}`;
        }else {
          result.error.e = new Error(msg)
        }
      }
      return result;
    }
  })(name);
}

export default {...rpc};