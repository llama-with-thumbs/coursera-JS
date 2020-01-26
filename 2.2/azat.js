class A {
    f1(){
        setTimeout(function() {
            console.info('200');
        }, 200)
        return this;
    }
    f2(){
        setTimeout(function() {
            console.info('100');
        }, 100)
        return this;
    }
};

let a = new A;
a.f1().f1().f2();