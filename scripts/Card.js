import { imageCaption, popupImage, imagePopup } from "./index.js";

export class Card {
  constructor(cardName, cardLink, openPopup, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {  //выбрать шаблон
    const cardTemplate = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    return cardTemplate;
  }

  _like() { //поставить лайк
    this._buttonLike.classList.toggle('element__like-button_active');
  }

  _removeCard() { //удалить карточку
    this._element.remove();
    this._element = null;
  }

  _openImagePopup() { //открыть попап с изображением
    popupImage.src = this._cardLink;
    popupImage.alt = this._cardName;
    imageCaption.textContent = this._cardName;
    this._openPopup(imagePopup);
  }

  _setEventListeners() { //поставить слушатели
    this._buttonLike.addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._removeCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImagePopup();
    })
  }

  createCard() { //заполнить карточку данными
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._cardLink;
    this._element.querySelector('.element__caption').textContent = this._cardName;

    return this._element;
  }
}

