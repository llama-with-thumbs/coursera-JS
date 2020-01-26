// IIFE immediately invoked function expression
// var varName = (function(){return function(){}}());
var varAsterisk = (function(){
    function format(param){
        return "***"+param;
    }
    return function(param){
        param = param || "default";
        return format(param);
    }
}());
console.log(varAsterisk());
console.log(varAsterisk("not default"));
