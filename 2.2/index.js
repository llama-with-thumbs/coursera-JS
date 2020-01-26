module.exports = Collection;

function Collection(){
    this.collArray = [];
}
Collection.prototype.values = function(){
    return this.collArray;
}
Collection.prototype.count = function(){
    return this.collArray.length;
}
Collection.prototype.at = function(position){
    var position = this.collArray[position - 1];
    return position == undefined? null : position;
}
Collection.prototype.append = function(collArray){
    if(typeof(collArray) != "object"){
        this.collArray.push(collArray);
    } else{
        this.collArray = this.collArray.concat(collArray.values());
    }
    return undefined;
}
Collection.prototype.removeAt = function(position){
    if (position < 1){ return false};
    return this.collArray.splice((position - 1), 1).length == 0 ? false : true;
}

Collection.from = function(collArray){
    var collection = new Collection();
    collection.collArray = collArray;
    return collection;
}
