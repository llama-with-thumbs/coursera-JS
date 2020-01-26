function counter(){
    var counter = 0;
    return function(value){
        value = value || 0;
        return counter+=value;
    }
}

var newCounter = counter();
for(i = 0; i < 10; i++){
    newCounter(1);
}
console.log(newCounter());