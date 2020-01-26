    
    function intersectArreys( mainArr, nextArrey){ 
        return mainArr.filter(value => nextArrey.includes(value));
    }
    // console.log(intersectArreys([1, 2, 3], [3, 5, 8, 1]));

    function select(){
        return {select: [].slice.call(arguments)};
    }
    
    function filterIn(property, values) {     
        return {[property]: values};
    }
    
    var selectAcc = [];
    selectAcc[0]= ['prop1', 'prop2', 'prop3', 'prop4'];
    var filterAcc = {prop1: [10, 20, 30], prop4: [100, 300]};
    var args = [{select: ['prop1', 'prop2', 'prop3']},
                {select: ['prop2', 'prop4', 'prop1']},
                {prop1: []}];

    
    for(i=0; i<args.length; i++){
        if(args[i].hasOwnProperty('select')){
            selectAcc[0] = intersectArreys(selectAcc[0], args[i].select);
        } else{
            var propertyName = Object.getOwnPropertyNames(args[i]).join();
            if(filterAcc.hasOwnProperty(propertyName)){
                filterAcc[propertyName] = intersectArreys(filterAcc[propertyName], args[i][propertyName]);
            } else{
                filterAcc[propertyName] = args[i][propertyName];
            }
        }
    }


    // console.log(selectAcc[0]);
    // console.log(filterAcc);

    //filter
    // var arr1 = [11, 22, 44];
    // var arr2 = [22, 16];
    // function intersectArrays(arr1, arr2){
    //     return arr1.filter(function(x){
    //         return arr2.indexOf(x) != -1;
    //     })
    // }
    // console.log(intersectArrays(arr1, arr2));
    // console.log(arr1);
    // console.log(arr2);

    var filterAcc = {prop1: ['val1', 'val2', 'val3']}; //for filter
    var collCopy = [{prop1 : 'val2', prop2 : 'val2'},
                    {prop2: 'val3', prop1: 'val3'},
                    {prop1 : 'val4', prop2: 'val3'}];

    // var filterKeysArr = Object.keys(filterAcc);
    // var filtredCollection = collCopy.filter(function(elementOfCollection){
    //     var collectionKeysArr = Object.keys(elementOfCollection);
    //     return collectionKeysArr.every(function(elCollProp){
    //         var  propValue = elementOfCollection[elCollProp];
    //         return filterAcc.hasOwnProperty(elCollProp) ? filterAcc[elCollProp].indexOf(propValue) != -1 : true;
    //     })
    // });
    
    // console.log(filtredCollection);

    var selectAcc = ['prop1'];

    collCopy.forEach(function(elOfColl){
        collKeyArr = Object.keys(elOfColl);
        collKeyArr.forEach(function(collKey){
            if(selectAcc.indexOf(collKey) == -1){
                delete elOfColl[collKey];
            }
        })
    })

    // console.log(collCopy);

    var obj1 = {prop1 : 'val1', prop2: 'val2'};
    // var obj2 =  Object.assign({}, obj1);
    var obj2 = JSON.parse(JSON.stringify(obj1)); 
    // Object.seal(obj2);

    delete obj1.prop1;
    console.log(obj1);
    console.log(obj2);
