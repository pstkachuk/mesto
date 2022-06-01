export class Card {
  constructor({cardName, cardLink, cardLikes, userId, ownerId, cardId, handleCardClick, handleDeleteClick, handleLikeClick}, api, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._cardLikes = cardLikes;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._api = api;
  }

  _getTemplate() {  //выбрать шаблон
    const cardTemplate = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    return cardTemplate;
  }

  _toggleLikeButtonState() { //переключение состояния кнопки лайка
    this._buttonLike.classList.toggle('element__like-button_active');
  }

  _hideZeroLikesCounter(likesData) { // скрыть пустой счётчик
    if (likesData.length > 0) {
      this._likesCounter.textContent = likesData.length;
    } else {
      this._likesCounter.textContent = '';
    }
  }

  removeCard() { //удалить карточку
    this._element.remove();
    this._element = null;
  }

  handleLike() {  // поставить/снять лайк
    if (this._buttonLike.classList.contains('element__like-button_active')) {
      this._api.deleteLike(this._cardId)
      .then((res) => {
        this._toggleLikeButtonState();
        this._likesCounter.textContent = res.likes.length;
        this._hideZeroLikesCounter(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      this._api.like(this._cardId)
      .then((res) => {
        this._toggleLikeButtonState();
        this._likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  _setEventListeners() { //поставить слушатели
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick()
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

    this._elementImage.src = this._cardLink;
    this._elementImage.alt = this._cardName;
    this._element.querySelector('.element__caption').textContent = this._cardName;

    if (!(this._userId === this._ownerId)) {    //скрыть кнопку удаления на чужих карточках
      this._buttonDelete.classList.add('element__delete-button_hide');
    }

    if (this._cardLikes.some((likesData) => {  //если карточка уже была лайкнута - отобразить лайк
      return this._userId === likesData._id
    }))
    {
      this._buttonLike.classList.add('element__like-button_active');
    }

    this._setEventListeners();
    this._hideZeroLikesCounter(this._cardLikes);

    return this._element;
  }
}
