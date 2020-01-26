// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var lib = require('./index.js');

// Коллекция данных
var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];
var cats =[ {1: 10, 2:20, 3:30}, {1:10, 2:40, 3:30}];
console.log(lib.query(cats, lib.select('16'),lib.select('1'), lib.filterIn(3, [10, 30]), lib.filterIn( 1, [10])));
// console.log(lib.query(cats));
// console.log(lib.filterAcc);
// console.log(lib.selectAcc);
console.log(cats);
// console.log(lib.collCopy);

// Выполняем выборку и фильтрацию с помощью нашего конструктора

// var result = lib.query(friends, lib.select('name', 'gender', 'size'), lib.filterIn('name', ['Стелла', 'Britney', 'Керри']));
// console.log(lib.filterAcc);
// console.log(lib.selectAcc);
// console.log(result);

// lib.filterIn('name', ['Стелла', 'Britney', 'Керри']);
// lib.filterIn('email', ['vm', 'waltersguzman@example.com', 'danamcgee@example.com']);
// lib.filterIn('gender', ['Женский', 'Апельсин@example.com', 'danamcgee@example.com']);


// lib.filterIn('name', ['Стелла', 'b', 'Керри']);
// lib.filterIn('name', ['b', 'Стелла', 'd', 'Керри']);
// lib.filterIn('name', ['Керри', 'Стелла']);
// lib.filterIn('email', ['vm', 'walterskguzman@example.com', 'vt']);
// lib.filterIn('email', ['vt', 'waltersguzman@example.com', 'vg']);
// lib.filterIn('email', ['bm', 'waltersguzman@example.com', 'bt']);
// lib.filterIn('email', ['bt', 'waltersguzman@example.com']);

// lib.select('Fruit', 'Brad', 'V ege');
// lib.select('name', 'gender', 'size');


// console.log(lib.result);
// console.log(lib.filterAcc);

// lib.go();
// console.log(lib.selectAcc);
