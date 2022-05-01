export class FormValidator {
  constructor(validateConfig, form) {
    this._formSelector = validateConfig.formSelector;
    this._inputSelector = validateConfig.inputSelector;
    this._submitButtonSelector = validateConfig.submitButtonSelector;
    this._inactiveButtonClass = validateConfig.inactiveButtonClass;
    this._inputErrorClass = validateConfig.inputErrorClass;
    this._errorClass = validateConfig.errorClass;
    this._form = form;
  }

  _showInputError(inputElement) { //показаь сообщение об ошибке
    const errorMessage = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorMessage.classList.add(this._errorClass);
    errorMessage.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) { //спрятать сообщение об ошибке
    const errorMessage = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorMessage.classList.remove(this._errorClass);
    errorMessage.textContent = '';
  }

  _isValid(inputElement) { //проверка валидности поля
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) { //проверка валидности всех полей
    return inputList.some((listItem) => {
      return !listItem.validity.valid;
    })
  }

  _toggleButtonState(buttonElement, inputList) { //переключить состояние кнопки
    if (this._hasInvalidInput(inputList)) {
      this.setButtonDisabled(buttonElement);
    } else {
      this.setButtonEnabled(buttonElement);
    }
  }

  clearErrorMessages(formElement) {
    const errorList = Array.from(formElement.querySelectorAll('.popup__input-error'));
    errorList.forEach((errorListItem) => {
      errorListItem.classList.remove(this._errorClass);
      errorListItem.textContent = '';
    });
    this._inputList.forEach((inputListItem) => {
      inputListItem.classList.remove(this._inputErrorClass);
    })
  }

  setButtonEnabled(buttonElement) { //активировать кнопку
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  setButtonDisabled(buttonElement) { //отключить кнопку
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  enableValidation() { //включить валидацию формы
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((listItem) => {
      listItem.addEventListener('input', () => {
        this._isValid(listItem);
        this._toggleButtonState(buttonElement, this._inputList);
      });
    });
  }
}
