import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    })
  }

  handleSubmit(submit) {
    this._handleSubmitForm = submit;
  }
}
