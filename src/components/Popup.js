export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClosePopupClickOverlay() {
    if (this._popupSelector.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popupSelector.addEventListener('mousedown', () => this._handleClosePopupClickOverlay());
  }
}
