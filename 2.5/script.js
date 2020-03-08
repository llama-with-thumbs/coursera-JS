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

    function switchClasses(object, status, invalidClass, validClass) {
        if (status) {
            object.classList.contains(invalidClass) ? object.classList.remove(invalidClass) & object.classList.add(validClass) : object.classList.add(validClass); 
        } else {
            object.classList.contains(validClass) ? object.classList.remove(validClass) & object.classList.add(invalidClass) : object.classList.add(invalidClass); 
        }
    }

    function dataRequiredCheck(target) {
        if ((target.dataset.hasOwnProperty('required') && !target.value) || (target.value && !dataValidCheck(target))) {
            return true;
        }
    }

    window.validateForm = function(formInput) {
        var form = document.getElementById('profile');

        form.addEventListener('blur', function(event) {
            if (event.target.tagName == "INPUT" && dataRequiredCheck(event.target)) {
                event.target.classList.add(formInput.inputErrorClass);
            }
        }, true);

        form.addEventListener('focus', function(event) {
            if (event.target.tagName == "INPUT") {
                event.target.classList.remove(formInput.inputErrorClass);
            }
        }, true);

        form.addEventListener('submit', function(event) {
            var checkList = Array.from(form.querySelectorAll('input'));
            var status = checkList.every(element => !dataRequiredCheck(element));
            switchClasses(form, status, formInput.formInvalidClass, formInput.formValidClass);
            event.preventDefault();
        });

    };

}());