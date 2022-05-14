export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClosePopupClickOverlay(evt) { //закрыть окно по клику на оверлей
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('mousedown', (evt) => this._handleClosePopupClickOverlay(evt));
  }
}
