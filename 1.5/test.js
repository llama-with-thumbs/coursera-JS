var message = 'Simple test';
var func1 = {
  message: 1,
  getMessage: function () {
    return this.message++;
  }
};

var arr = [1, 2, 3];
arr.map(function(element){
  element*2;
});
console.log(arr);