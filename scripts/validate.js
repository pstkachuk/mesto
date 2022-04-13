const validateConfig = { //настройки валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

function showInputError(formElement, formInput, errorMessage, validateOptions) { //показать ошибку
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validateOptions.inputErrorClass);
  errorElement.classList.add(validateOptions.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, formInput, validateOptions) { //скрыть ошибку
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validateOptions.inputErrorClass);
  errorElement.classList.remove(validateOptions.errorClass);
  errorElement.textContent = '';
};

function isValid(formElement, formInput, validateOptions) { //проверка валидности поля
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, validateOptions);
  } else {
    hideInputError(formElement, formInput, validateOptions);
  }
};

function setEventListeners(formElement, validateOptions) { //установить слушатель всем полям формы
  const inputList = Array.from(formElement.querySelectorAll(validateOptions.inputSelector));
  const buttonElement = formElement.querySelector(validateOptions.submitButtonSelector);  
  inputList.forEach(function(listItem) {
    listItem.addEventListener('input', function() {
      isValid(formElement, listItem, validateOptions);
      toggleButtonState(inputList, buttonElement, validateOptions);
    });
  });
};

function enableValidation(validateOptions) { //включить валидацию всех форм
  const formList = Array.from(document.querySelectorAll(validateOptions.formSelector));
  formList.forEach(function(listItem) {
    listItem.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(listItem, validateOptions);
  });
};

function hasInvalidInput(inputList) {// проверка валидности всех полей
  return inputList.some(function (listItem) {
    return !listItem.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, validateOptions) { //переключает состояние кнопки
  if (hasInvalidInput(inputList)) {
    setButtonDisabled(buttonElement, validateOptions.inactiveButtonClass);
  } else {
    setButtonEnabled(buttonElement, validateOptions.inactiveButtonClass);
  };
};

function setButtonDisabled(buttonElement, validateOptions) { //отключить кнопку
  buttonElement.classList.add(validateOptions);
  buttonElement.setAttribute('disabled', true);
};

function setButtonEnabled(buttonElement, validateOptions) { //активировать кнопку
  buttonElement.classList.remove(validateOptions);
  buttonElement.removeAttribute('disabled');
};

function clearErrorMessages(formElement) { //скрыть сообщение об ошибке
  const errorList = Array.from(formElement.querySelectorAll('.popup__input-error'));
  const errorInputList = formElement.querySelectorAll(validateConfig.inputSelector);
  errorList.forEach(function(errorListItem) {
    errorListItem.classList.remove(validateConfig.errorClass);
    errorListItem.textContent = '';
  });
  errorInputList.forEach(function(errorInputListItem) {
    errorInputListItem.classList.remove(validateConfig.inputErrorClass);
  });
};

enableValidation(validateConfig);
