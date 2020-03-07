'use strict';

// Код валидации формы
(function() {
    function numberCheck(target) {
        var min = target.dataset.hasOwnProperty('validatorMin') ? target.dataset.validatorMin : Number.NEGATIVE_INFINITY;
        var max = target.dataset.hasOwnProperty('validatorMax') ? target.dataset.validatorMax : Number.POSITIVE_INFINITY;
        return isFinite(target.value) && Number(target.value) <= max && Number(target.value) >= min;
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
        if ((target.dataset.hasOwnProperty('required') && !target.value)||(target.value && !dataValidCheck(target))) {
            target.classList.add(inputErrorClass);
        }
    }

    window.validateForm = function(formInput) {
        var formId = formInput.formId;
        var formValidClass = formInput.formValidClass;
        var formInvalidClass = formInput.formInvalidClass;
        var inputErrorClass = formInput.inputErrorClass;
        var form = document.getElementById('profile');

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
            var checkList = Array.from(form.querySelectorAll('input'));
            checkList.forEach(element => {
                dataRequiredCheck(element.id, inputErrorClass);
            });
            
            if (checkList.some(function(element) {
                    return element.classList.contains(inputErrorClass);
                })) {
                form.classList.contains(formValidClass) ? form.classList.remove(formValidClass)&&form.classList.add(formInvalidClass) : form.classList.add(formInvalidClass);
            } else {
                form.classList.contains(formInvalidClass) ? form.classList.remove(formInvalidClass)&&form.classList.add(formValidClass) : form.classList.add(formInvalidClass);
            }
            event.preventDefault();
        });

    };

}());