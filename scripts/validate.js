const validateOptions = { //настройки валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

function showInputError(formElement, formInput, errorMessage) { //показать ошибку
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validateOptions.inputErrorClass);
  errorElement.classList.add(validateOptions.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, formInput) { //скрыть ошибку
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validateOptions.inputErrorClass);
  errorElement.classList.remove(validateOptions.errorClass);
  errorElement.textContent = '';
};

function isValid(formElement, formInput) { //проверка валидности поля
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

function setEventListeners(formElement) { //установить слушатель всем полям формы
  const inputList = Array.from(formElement.querySelectorAll(validateOptions.inputSelector));
  const buttonElement = formElement.querySelector(validateOptions.submitButtonSelector);
  if (formElement === formNewCard) { // если открыто окно добавления новой карточки - заблокировать кнопку
    setButtonDisabled(buttonElement);
  };

  inputList.forEach(function(listItem) {
    listItem.addEventListener('input', function() {
      isValid(formElement, listItem);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation(validateOptions) { //включить валидацию всех форм
  const formList = Array.from(document.querySelectorAll(validateOptions.formSelector));
  formList.forEach(function(listItem) {
    listItem.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(listItem);
  });
};

function hasInvalidInput(inputList) {// проверка валидности всех полей
  return inputList.some(function (listItem) {
    return !listItem.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) { //переключает состояние кнопки
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validateOptions.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validateOptions.inactiveButtonClass);
  };
};

function setButtonDisabled(buttonElement) { //отключить кнопку
  buttonElement.classList.add(validateOptions.inactiveButtonClass);
};

function setButtonEnabled(buttonElement) { //активировать кнопку
  buttonElement.classList.remove(validateOptions.inactiveButtonClass);
};

function clearErrorMessages(formElement) { //скрыть сообщение об ошибке
  const errorList = Array.from(formElement.querySelectorAll('.popup__input-error'));
  const errorInputList = formElement.querySelectorAll(validateOptions.inputSelector);
  errorList.forEach(function(errorListItem) {
    errorListItem.classList.remove(validateOptions.errorClass);
    errorListItem.textContent = '';
  });
  errorInputList.forEach(function(errorInputListItem) {
    errorInputListItem.classList.remove(validateOptions.inputErrorClass);
  });
};

enableValidation(validateOptions);
