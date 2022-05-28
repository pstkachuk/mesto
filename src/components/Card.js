export class Card {
  constructor({cardName, cardLink, handleCardClick, handleOpenConfirmPopup}, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleOpenConfirmPopup = handleOpenConfirmPopup; //
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

  _setEventListeners() { //поставить слушатели
    this._buttonLike.addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleOpenConfirmPopup); //
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  createCard() { //заполнить карточку данными
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._elementImage.src = this._cardLink;
    this._elementImage.alt = this._cardName;
    this._element.querySelector('.element__caption').textContent = this._cardName;

    return this._element;
  }
}
