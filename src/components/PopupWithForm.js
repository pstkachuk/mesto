import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = popupSelector.querySelector('.popup__form');
    this._inputsList = this._form.querySelectorAll('.popup__input');
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
    this._form.reset();
    super.close();
  }
}
