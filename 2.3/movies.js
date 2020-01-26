function parallel(operations, callback){
    var data = [];
    var error = null;
    function download(param1, param2){
        if (param1) return param1
        else return data.push(param2)
    }
    function func2(param1, param2){ 

    }

    operations.forEach(function(operation, callback){
        operation(download);
    });

    setTimeout(function(){
        return callback(error, data);
    }, 100);
};

parallel([
    function(next){
        setTimeout(function(){
            next(null, '100ms');
        }, 200);
    }, function(next){
        next(null, '200ms');
    }, function(next){
        next(null, '300ms')
    }],
    function(param1, param2){
        console.log(param1, param2);
    }
);