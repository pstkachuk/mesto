import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__submit-button');
    this._buttonTextContent = this._buttonSubmit.textContent;
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

  renderLoading(state) {
    if (state) {
      this._buttonSubmit.textContent = 'Удаление...'
    } else {
      this._buttonSubmit.textContent = this._buttonTextContent;
    }
  }
}
