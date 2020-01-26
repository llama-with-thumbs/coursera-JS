/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */

// params two arrays; new array : result of intersection 
function intersectArreys( mainArr, nextArrey){ 
    return mainArr.filter(function(x){
        return nextArrey.indexOf(x) != -1;
    })
}

function select(){
    return {select: [].slice.call(arguments)};
}

function filterIn(property, values) {     
    return {[property]: values};
}

function query(collection) {
    var filterAcc = {}; //for filter
    var selectAcc = []; //for select
    var allArguments = Array.prototype.slice.call(arguments);
    var collCopy = [];

    allArguments[0].slice().forEach(function(collObj){
        collCopy.push(JSON.parse(JSON.stringify(collObj)));
    })

    var args = allArguments.slice(1);
    selectAcc = Object.keys(collCopy[0]);

    for(i=0; i<args.length; i++){
        if(args[i].hasOwnProperty('select')){
            if(intersectArreys(selectAcc, args[i].select).length > 0){
                selectAcc = intersectArreys(selectAcc, args[i].select);
            }
        } else{
            var propertyName = Object.getOwnPropertyNames(args[i]).join();
            if(filterAcc.hasOwnProperty(propertyName)){
                filterAcc[propertyName] = intersectArreys(filterAcc[propertyName], args[i][propertyName]);
            } else{
                filterAcc[propertyName] = args[i][propertyName];
            }
        }
    }
    
    //filter
    collCopy = collCopy.filter(function(elementOfCollection){
        var collectionKeysArr = Object.keys(elementOfCollection);
        return collectionKeysArr.every(function(elCollProp){
            var  propValue = elementOfCollection[elCollProp];
            return filterAcc.hasOwnProperty(elCollProp) ? filterAcc[elCollProp].indexOf(propValue) != -1 : true;
        })
    });

    //select
    collCopy.forEach(function(elOfColl){
        collKeyArr = Object.keys(elOfColl);
        collKeyArr.forEach(function(collKey){
            if(selectAcc.indexOf(collKey) == -1){
                delete elOfColl[collKey];
            }
        })
    })
    return collCopy;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
