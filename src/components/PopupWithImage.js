import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCaption = this._popupSelector.querySelector('.image-popup__caption');
    this._image = this._popupSelector.querySelector('.image-popup__image');
  }

  open(caption, link) {
    this._imageCaption.textContent = caption;
    this._image.alt = caption;
    this._image.src = link;
    super.open();
  }
}
