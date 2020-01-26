module.exports = function(operations, callback){
    var test = Array(operations.length);
    var result = [];
    var trueRes = Array(operations.length);
    var error = null;
    //['500ms', '50ms', '200ms']
    function next(){
        return function(index){
            return function(err, res){
                // console.log(err, res, test.length , result.length, index);

                result.push(res);
                trueRes[index] = res;

                // console.log(err, res, test.length , result.length);
                if (test.length == result.length){
                    if(!error){
                        callback(null, trueRes);
                    }
                } else {
                    if(!error){
                        if(err){
                            // console.log('err');
                            error = err;
                            return callback(err, null);
                        }
                    }
                }
            }
        }
    };
    var nextNext = next();
    if(operations.length == 0){
        callback(null, []);
    } else {
        operations.map(function(element, index){
            // console.log(index);
            var nextNextNext = nextNext(index);
            element(nextNextNext);
        })
    }

}