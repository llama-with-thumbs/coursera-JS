// function func1(){
//     var variable = 10;
//     return function(par){
//         variable += par;
//         return variable;
//     }
// }

// var count1 = func1();
// count1(100);
// count1(200);
// console.log(count1(1));
function func1(){
    return function(undefiend){
        
    }
}
function getPhotos(){
    setTimeout(function(){
        console.log('getPhotos...');
    }, 100)
}
function download(adress, callback){
    adress();
    callback('err', 0);
}
function print(err, photo){
    if (err) console.log(err)
    else console.log(photo)
}

download(getPhotos, print);
