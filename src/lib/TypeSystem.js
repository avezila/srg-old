
export const Float = Type("Float",val => {
  if(val == undefined || val == null) return undefined;
  let num = Number(val);
  if (isNaN(num)){
    throw new Error(`Failed parse float from ${JSON.stringify(val)}`)
  }
  return num;
});

export const String = Type("String",
  (val => val!=undefined ? ""+val : undefiend),
);

export const Int    = Type("Int",
  (val => val!=undefined ? +val : undefiend ),
);

export const Bool    = Type("Bool",
  (val => val!=undefined ? val==true : undefiend ),
);



export function Enum (name,type={}){
  if(typeof name != 'string')
    throw new Error("Expected name in enum definition");
  function Single (key){
      if (type[key] == undefined)
        throw new Error(`Unknown field '${key}' in enum ${name}:{${Object.keys(type)}}`); 
      return {
        key,
        val   : type[key],
      }
  }
  Single.array = function _Array (...l) {
    if (l.length == 0) l.push(0);
    return function ResolveArray(arr,index=0){
      let length = l[index];
      if (length && arr.length != length)
        throw new Error(`Wrong length for array [${length}]${name}(${JSON.stringify(arr)}); from [${l}][${index}], got ${arr.length}`)

      if(l.length==(index+1)){
        return arr.map(el=>Single(el))
      }else {
        return arr.map(el=>ResolveArray(el,index+1));
      }
    }
  }
  return Object.assign(
    Single, 
    type,
  )
}

function Apply (type,val){
  if(typeof type == 'function'){
    return type(val)
  }else if(typeof type == "object"){
    if(typeof val != 'object')
      throw new Error(`Wrong types: ${typeof type} != ${typeof val}
                        in ${JSON.stringify(type)}:${JSON.stringify(val)}}`);
      let ret = {};
      for (let key in val){
        if(type[key] == undefined)
          throw new Error(`Unknown field ${key} in {${Object.keys(type)}}
                            from ${JSON.stringify(val)}`);
        ret[key] = Apply(type[key],val[key])
      }
      return ret;
  }else {
    return val;
  }
}

export function Type (name,type={},_default={},_const={}){
  if(typeof name != 'string')
    throw new Error("Expected name in type definition");

  let fields = {};
  
  for (let key in type){
    if(key == "default" || key=="array" || key == "const")continue;
    (function(key){
      fields[key] = function(val){
        if (_const[key]!=undefined)
          throw new Error(`Cannot  override const field '${key}' in type ${name}:{${Object.keys(type)}}`);
        return Apply(type[key],val);
      }
      fields[key].default = _const[key] || _default[key];
      if(typeof type[key]== 'function' && fields[key].default!=undefined){
        fields[key].default = type[key](fields[key].default)
      }
      if(fields[key].default == undefined)
        fields[key].default = type[key].default
    })(key);
  }
  function Single (obj) {
    if(typeof type == 'function'){
      return type(obj,name,_default,_const);
    }
    let ret = {}
    let check = {...fields}

    for (let key in obj){
      if(key == "default" || key=="array" || key=="const")continue;
      if (check[key]==undefined)
        throw new Error(`Unknown field '${key}' in type ${name}:{${Object.keys(type)}}`);
      ret[key] = check[key](obj[key])
      delete check[key];
    }
    for(let key in check)
      if(check[key].default != undefined){
        if(typeof check[key].default != 'function'){
          ret[key] = check[key].default;
        }else {
          ret[key] = undefined;
        }
      }
    return ret;
  }

  Single.array = function _Array (...l) {
    if (l.length == 0) l.push(0);
    return function ResolveArray(arr,index=0){
      let length = l[index];
      if (length && arr.length != length)
        throw new Error(`Wrong length for array [${length}]${name}(${JSON.stringify(arr)}); from [${l}][${index}], got ${arr.length}`)

      if(l.length==(index+1)){
        return arr.map(el=>Single(el))
      }else {
        return arr.map(el=>ResolveArray(el,index+1));
      }
    }
  }
  Single.default = function(def={}){
    return Type(name,type,{..._default,...def},_const);
  }
  Single.const = function(cnst={}){
    return Type(name,type,_default,{..._const,...cnst});
  }
  return Object.assign(
    Single,
    fields,
  )
}