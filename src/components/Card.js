export class Card {
  constructor({cardName, cardLink, cardLikes, userId, ownerId, handleCardClick, handleConfirmPopup, handleLikeClick}, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._cardLikes = cardLikes;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmPopup = handleConfirmPopup;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
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

  removeCard() { //удалить карточку
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() { //поставить слушатели
    this._buttonLike.addEventListener('click', () => {
      this._like();
      this._handleLikeClick();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleConfirmPopup()
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  createCard() { //заполнить карточку данными
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._elementImage = this._element.querySelector('.element__image');
    this._likesCounter = this._element.querySelector('.element__likes-counter');
    this._setEventListeners();
    this._elementImage.src = this._cardLink;
    this._elementImage.alt = this._cardName;
    this._element.querySelector('.element__caption').textContent = this._cardName;
    if (this._cardLikes > 0) {    //если лайков на карточке нет - счётчик не отображается
      this._likesCounter.textContent = this._cardLikes;
    }

    if (!(this._userId === this._ownerId)) {
      this._buttonDelete.classList.add('element__delete-button_hide');
    }


    return this._element;
  }
}
