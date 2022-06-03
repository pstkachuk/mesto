export class Card {
  constructor({cardName, cardLink, cardLikes, userId, ownerId, cardId, handleCardClick, handleDeleteClick, handleLikeClick}, templateSelector) {
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

  handleLike(likes) {  // поставить/снять лайк    
    this._cardLikes = likes;
    this._likesCounter.textContent = this._cardLikes.length;
    this._hideZeroLikesCounter(likes);

    if (this.isLiked()) {
        this._toggleLikeButtonState();
      } else {
        this._toggleLikeButtonState();
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

  isLiked() {
    return Boolean(this._cardLikes.find((item) => {
      return this._userId === item._id;
    }))
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

    if (this.isLiked()) {
      this._toggleLikeButtonState();
    } 

    this._setEventListeners();
    this._hideZeroLikesCounter(this._cardLikes);

    return this._element;
  }
}
