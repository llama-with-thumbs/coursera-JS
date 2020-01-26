// i need to read json from file and if it was sucsess print it or error otherwise

let f1 = function() {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('f1 is working');
            resolve();
        }, 300);
        
    })
};
let f2 = function() {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('f2 is working');
            throw 'Uh-oh!';
        }, 100);
    });
}

f1().then(f2()).catch(function(error) {
    console.error(error);
  });
