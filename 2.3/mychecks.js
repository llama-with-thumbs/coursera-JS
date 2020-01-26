var assert = require('assert');
var parallel = require('./index');


parallel(
    [
        // Операция, которая выполняется 500ms
        function (next) {
            setTimeout(function () {
                next(null, '500ms');
            }, 500);
        },

        // Операция, которая выполняется 50ms
        function (next) {
            setTimeout(function () {
                next(null, '50ms');
            }, 50);
        },

        // Операция, которая выполняется 200ms
        function (next) {
            setTimeout(function () {
                next(null, '200ms');
            }, 200);
        }
    ],

    // Обработка результата выполнения операций (результирующий callback)
    function (errors, result) {
        console.log(errors, result);
    }
);

parallel(
    [],
    function (error, results) {
        console.log(error, results);
    }
);
