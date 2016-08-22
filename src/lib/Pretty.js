

String.prototype.reverse  = function (){
  return this.split("").reverse().join("")
}

String.prototype.prettyInt = function(){
  return this.replace(/\..*/,"").reverse().replace(/(\d\d\d)/g,"$1 ").reverse()
}
