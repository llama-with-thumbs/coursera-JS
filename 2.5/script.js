'use strict';

// Код валидации формы
(function() {
    window.validateForm = function(form) {
        // var formKeys = Object.keys(form);
        // formKeys.forEach(key => {
        //     console.log(key, ':', form[key]);
        // });
        var formId = form.formId;
        var formValidClass = form.formValidClass;
        var formInvalidClass = form.formInvalidClass;
        var inputErrorClass = form.inputErrorClass;
        var form = document.getElementById('profile');

        function dataRequiredCheck(targetId, inputErrorClass) {
            var target = document.getElementById(targetId);
            if (target.dataset.hasOwnProperty('required')) {
                target.classList.add(inputErrorClass);
            }
        };
        function numberCheck(target) {

        }
        function dataValidCheck(target, inputErrorClass) {
            // if (target.dataset.hasOwnProperty('validator')) {
            //     console.log(target.dataset.validator);
            //     console.log(target.value);
            //     numberCheck(target);
            // }
        }
        function formCheck(id) {
            var allFormInputes = document.querySelectorAll('#'+id+' input');
            allFormInputes.forEach(function (element) {
                console.log(element);
            });
        }

        form.addEventListener('blur', function(event) {
            if (event.target.tagName == "INPUT") {
                dataRequiredCheck(event.target.getAttribute('id'), inputErrorClass);
                dataValidCheck(event.target, inputErrorClass);
            }
        }, true);
        form.addEventListener('focus', function(event) {
            if (event.target.tagName == "INPUT") {
                event.target.classList.remove('input_error');
            }
        }, true);
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            formCheck(formId);
        });

    };

}());