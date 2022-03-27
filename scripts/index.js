const formElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const newCardCloseButton = document.querySelector('.new-card__close-button');
const formNewCard = document.querySelector('.new-card__form');
const newCardPopup = document.querySelector('.new-card');
const placeInput = document.getElementById('place');
const linkInput = document.getElementById('link');
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseButton = document.querySelector('.image-popup__close-button');
const image = document.querySelector('.image-popup__image');
const imageCaption = document.querySelector('.image-popup__caption');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardTemplate = document.querySelector('.template').content;
const elementsList = document.querySelector('.elements__list');

function createCard(cardName, cardLink) { //создание карточки
  const element = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  const image = element.querySelector('.element__image');
  image.src = cardLink;
  image.alt = cardName;
  element.querySelector('.element__caption').textContent = cardName;
  image.addEventListener('click', openImagePopup(cardName, cardLink));
  element.querySelector('.element__like-button').addEventListener('click', like);
  element.querySelector('.element__delete-button').addEventListener('click', cardRemove(element));
  return element;
}

function cardRemove(element) { //удаление карточки
  return function() {
    element.remove();
  }
}

function loadCards() { //при загрузке страницы добавляет 6 карточек
  initialCards.forEach(function(item) {
    const element = createCard(item.name, item.link);
    elementsList.append(element);
  });
}

function openPopup(popupName) { // открытие окна
  if (popupName === popup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
  }
    popupName.classList.add('popup_opened');
}

function closePopup(popupName) { //закрытие окна
  if (popupName === newCardPopup) {
    placeInput.value = '';
    linkInput.value = '';
  }
  popupName.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {  //функция отправки формы и сохранения введенных данных
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popup);
}

function formNewCardHandler (evt) { //добавление новой карточки
  evt.preventDefault();
  const element = createCard(placeInput.value, linkInput.value);
  elementsList.prepend(element);
  closePopup(newCardPopup);
}

function like(event) { //поставить лайк
  event.target.classList.toggle('element__like-button_active');
}

function openImagePopup(name, link) { //открыть изображение
  return function() {
    image.src = link;
    imageCaption.textContent = name;
    openPopup(imagePopup);
  }
}

loadCards();
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', function() {openPopup(popup)});
addButton.addEventListener('click', function() {openPopup(newCardPopup)});
closeButton.addEventListener('click', function() {closePopup(popup)});
newCardCloseButton.addEventListener('click', function() {closePopup(newCardPopup)});
formNewCard.addEventListener('submit', formNewCardHandler);
imagePopupCloseButton.addEventListener('click', function() {closePopup(imagePopup)});
