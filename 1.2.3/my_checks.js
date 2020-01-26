// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var phoneBook = require('./index.js');

// Добавляем телефоны контакту Ivan
console.log(phoneBook('ADD Ivan 555-10-01,555-10-03'));
// console.log(phoneBook('SHOW'));
console.log(phoneBook('ADD Ivan 555-10-02'));
// console.log(phoneBook('SHOW'));
// console.log(phoneBook('REMOVE_PHONE 555-10-03'));
// console.log(phoneBook('SHOW'));
// console.log(phoneBook('REMOVE_PHONE 555'));
// console.log(phoneBook('SHOW'));
// console.log(phoneBook('ADD Alex 555-20-04'));
// console.log(phoneBook('SHOW'));
console.log(phoneBook('REMOVE_PHONE 555-10-03'));
console.log(phoneBook('ADD Alex 555-20-01'));
console.log(phoneBook('REMOVE_PHONE 555-20-01'));

console.log(phoneBook('SHOW'));

