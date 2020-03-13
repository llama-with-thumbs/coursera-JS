'use strict';

// ÐšÐ¾Ð´ Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ð¸ Ñ„Ð¾Ñ€Ð¼Ñ‹
const validateForm = ({
  formId,
  formValidClass,
  formInvalidClass,
  inputErrorClass
}) =>{
  let name = document.querySelector('#profile-name');
  let age = document.querySelector('#profile-age');
  let phone = document.querySelector('#profile-phone');
  let number = document.querySelector('#profile-number');
  let elements = [name, age, phone, number];

  document.getElementById(formId).addEventListener('submit', (e) =>{
    e.preventDefault();
    let isValidForm = true;
    for (let i = 0; i < elements.length; i += 1){
      if (!checkFunction(elements[i])){
        isValidForm = false;
        break;
      }
      if (elements[i].dataset.hasOwnProperty('required')){
        if (!elements[i].value){
          isValidForm = false;
          break;
        }
      }
    }
    if (isValidForm){
      e.target.classList.remove(formInvalidClass);
      e.target.classList.add(formValidClass);
    }else{
      e.target.classList.remove(formValidClass);
      e.target.classList.add(formInvalidClass);
    }
  })

  for (let i = 0; i < elements.length; i += 1){
    elements[i].addEventListener('blur', (e) => {
      let el = e.target;
      let isValid = false;
      if(el.dataset.hasOwnProperty('validator')){
        isValid = checkFunction(el);
        if (isValid){
          el.classList.remove(inputErrorClass);
        }else{
          el.classList.add(inputErrorClass);
        }
      };
    })
    elements[i].addEventListener('focus', (e) => {
      e.target.classList.remove(inputErrorClass)
    })
  }
}

const checkFunction = (el) => {
  let isValid = false;
  switch (el.dataset['validator']){
    case 'regexp':
      isValid = regexpCheck(el);
      break;
    case 'number':
      isValid = numberCheck(el);
      break;
    case 'letters':
      isValid = lettersCheck(el);
    default:
      break;
  }
  return isValid;
}

const regexpCheck = (el) => {
  let value = el.value;
  let pattern = el.dataset['validatorPattern'];
  let regexp = new RegExp(`${pattern}`);
  return regexp.test(value);
};

const numberCheck = (el) => {
  let value = el.value;
  if (!(/^\d+$/.test(value))) {
    return false;
  }
  let [min, max] = [undefined, undefined];
  if (el.dataset.hasOwnProperty('validatorMin')){
    min = el.dataset['validatorMin'];
    if (+min > +value){
      return false;
    }
  }
  if (el.dataset.hasOwnProperty('validatorMax')){
    max = el.dataset['validatorMax'];
    if (+max < +value){
      return false;
    }
  }
  return true;
};

const lettersCheck = (el) => {
  let value = el.value;
  if (!(/^[a-zA-ZÐ°-ÑÐ-Ð¯]+$/.test(value))){
    return false;
  }
  return true;
}