// //with callbacks 
// function cb(error, response){
//     if(error){
//         // Handle error.
//     }
//     else {
//         console.info(response);
//     }
// }
// class A {
//     f1(){
//         setTimeout(cb, 200, null, '200')
//         return this;
//     }
//     f2(){
//         setTimeout(cb, 100, null, '100')
//         return this;
//     }
// };

// let a = new A;
// a.f1().f1().f2();



// //with promises


// class A {
//     f1(){
//         return new Promise(function(resolve, reject){
//             setTimeout(function(){
//                 resolve();
//                 console.log('ran with a .3s delay');
//             }, 300);
//         });
//     }
//     f2() {
//         return new Promise(function(resolve, reject){
//             setTimeout(function(){
//                 resolve();
//                 console.log('ran with a .1s delay');
//             }, 100);
//         });
//     }
// }
// let a = new A();
// a.f1().then(a.f1).then(a.f2);

