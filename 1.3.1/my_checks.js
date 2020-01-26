// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var date = require('./index.js');



var new_date = date('2017-05-16 13:45')
                .add(3, 'years')
                .subtract(1, 'years')
                .add(2, 'months')
                .subtract(2, 'months')
                .add(1, 'days')
                .subtract(1, 'days')
                .add(1, 'hours')
                .subtract(1, 'hours')
                .add(1, 'minutes')
                .subtract(2, 'minutes')


console.log(new_date.value);

