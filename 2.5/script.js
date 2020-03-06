'use strict';

// Код валидации формы
(function() {
    function numberCheck(target) {
        var min = target.dataset.hasOwnProperty('validatorMin') ? target.dataset.validatorMin : Number.NEGATIVE_INFINITY;
        var max = target.dataset.hasOwnProperty('validatorMax') ? target.dataset.validatorMax : Number.POSITIVE_INFINITY;
        return isFinite(target.value) && target.value <= max && target.value >= min;
    }
    function lettersCheck(target) {
        return (/^[a-zA-Zа-яА-Я]+$/.test(target.value));
    }
    function regexpCheck(target) {
        var regExp = new RegExp(target.dataset.validatorPattern);
        return regExp.test(target.value);
    }
    function dataValidCheck(target) {
        if (target.dataset.hasOwnProperty('validator')) {
            if (target.dataset.validator == 'number') {
                return numberCheck(target);
            } else if (target.dataset.validator == 'letters') {
                lettersCheck(target);
                return lettersCheck(target);
            } else {
                return regexpCheck(target);
            }
        }
    }

    function dataRequiredCheck(targetId, inputErrorClass) {
        var target = document.getElementById(targetId);
        console.log(target.value);
        if ((target.dataset.hasOwnProperty('required') && !target.value)||(target.value && !dataValidCheck(target))) {
            target.classList.add(inputErrorClass);
        }
    }

    window.validateForm = function(form) {
        var formId = form.formId;
        var formValidClass = form.formValidClass;
        var formInvalidClass = form.formInvalidClass;
        var inputErrorClass = form.inputErrorClass;
        var form = document.getElementById('profile');

        function formCheck(id) {
            var allFormInputes = document.querySelectorAll('#'+id+' input');
            allFormInputes.forEach(function (element) {
                console.log(element);
            });
        }

        form.addEventListener('blur', function(event) {
            if (event.target.tagName == "INPUT") {
                dataRequiredCheck(event.target.getAttribute('id'), inputErrorClass);
            }
        }, true);
        form.addEventListener('focus', function(event) {
            if (event.target.tagName == "INPUT") {
                event.target.classList.remove('input_error');
            }
        }, true);
        form.addEventListener('submit', function(event) {
            var checkList = form.querySelectorAll('input');
            for (var i = 0, len = checkList.length; i < len; i++) {
                dataRequiredCheck(checkList[i].id, inputErrorClass);
            }
            event.preventDefault();
        });

    };

}());