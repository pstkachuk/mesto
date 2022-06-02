import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputsList = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.popup__submit-button');
    this._buttonTextContent = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputsList.forEach((inputsListItem) => {
      this._inputsValues[inputsListItem.name] = inputsListItem.value;
    })
    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(state) {
    if (state) {
      this._buttonSubmit.textContent = 'Сохранение...'
    } else {
      this._buttonSubmit.textContent = this._buttonTextContent;
    }
  }
}
