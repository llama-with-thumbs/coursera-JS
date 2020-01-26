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


// Создаем коллекцию чисел
var numbers = new Collection();
numbers.append(10);
numbers.append(20);

console.info(numbers.count());//2
console.info(numbers.values());// [10, 20]);

// // Создаем коллекцию букв
var letters = Collection.from(['a', 'b', 'c']);
letters.append('d');

console.info(letters.count());//, 4);
console.info(letters.values());//, ['a', 'b', 'c', 'd']);

// Смешиваем обе коллекции
var items = new Collection();
items.append(numbers);
console.info(items.values());
items.append(letters);
console.info(items.values());

console.info(items.count());//, 6);
console.info(items.values());//, [10, 20, 'a', 'b', 'c', 'd']);

// Проверяем получение элемента
console.info(items.at(0));//, null);
console.info(items.at(1));//, 10);
console.info(items.at(3));//, 'a');
console.info(items.at(6));//, 'd');

// // Проверяем удаление
console.info(items.removeAt(0));//, false);
console.info(items.removeAt(2));//, true);
console.info(items.removeAt(5));//, true);

console.info(items.values());//, [10, 'a', 'b', 'c']);

console.info('OK!');

console.info(items.removeAt(-1));

