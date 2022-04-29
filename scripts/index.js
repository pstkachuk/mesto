import {Card} from './Card.js';

const nameInput = document.getElementById('name');
const infoInput = document.getElementById('info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-button');
const buttonNewCardsAdd = document.querySelector('.profile__add-button');
const buttonNewCardClose = document.querySelector('.new-card__close-button');
const formNewCard = document.querySelector('.new-card__form');
const newCardPopup = document.querySelector('.new-card');
const buttonNewCardSubmit = document.querySelector('.new-card__submit-button');
const placeInput = document.getElementById('place');
const linkInput = document.getElementById('link');
export const imagePopup = document.querySelector('.image-popup');
const buttonImagePopupClose = document.querySelector('.image-popup__close-button');
export const image = document.querySelector('.image-popup__image');
export const imageCaption = document.querySelector('.image-popup__caption');
const cardsInitial = [
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
const elementsList = document.querySelector('.elements__list');
const profilePopup = document.querySelector('.profile-popup');
const formProfile = document.querySelector('.profile-popup__form');
const buttonProfileSubmit = document.querySelector('.popup__submit-button');

// function createCard(cardName, cardLink) { //создание карточки
//   const element = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
//   const image = element.querySelector('.element__image');
//   image.src = cardLink;
//   image.alt = cardName;
//   element.querySelector('.element__caption').textContent = cardName;
//   image.addEventListener('click', openImagePopup(cardName, cardLink));
//   element.querySelector('.element__like-button').addEventListener('click', like);
//   element.querySelector('.element__delete-button').addEventListener('click', removeCard(element));
//   return element;
// };

// function removeCard(element) { //удаление карточки
//   return function() {
//     element.remove();
//   };
// };

function loadCards(cardsList) { //при загрузке страницы добавляет 6 карточек
  cardsList.forEach((item) => {
    const card = new Card(item.name, item.link, openPopup, '.template');
    const cardElement = card.createCard();
    elementsList.append(cardElement);
  })
};

export function openPopup(popupName) { // открытие окна
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popupName) { //закрытие окна
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function resetForm(formElement) { //очистить форму
  formElement.reset();
};

function loadUserInfo() { //заполнить инпуты формы данными со страницы
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
};

function handleEditUserForm (evt) {  //функция отправки формы и сохранения введенных данных
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(profilePopup);
};

function handleAddCard (evt) { //добавление новой карточки
  evt.preventDefault();
  const card = new Card(placeInput.value, linkInput.value, openPopup, '.template');
  const cardElement = card.createCard();
  elementsList.prepend(cardElement);
  closePopup(newCardPopup);
};

// function like(event) { //поставить лайк
//   event.target.classList.toggle('element__like-button_active');
// };

// function openImagePopup(name, link) { //открыть изображение
//   return function() {
//     image.src = link;
//     image.alt = name;
//     imageCaption.textContent = name;
//     openPopup(imagePopup);
//   };
// };

function closePopupByEsc (evt) { //закрыть окно клавишей ESC
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  };
};

function setButtonEditProfileListeners() {
  openPopup(profilePopup);
  loadUserInfo();
  setButtonEnabled(buttonProfileSubmit, validateConfig.inactiveButtonClass); // разблокировать кнопку отправки после закрытия невалидной формы
  clearErrorMessages(formProfile);
};

function setButtonNewCardAddListeners() {
  openPopup(newCardPopup);
  resetForm(formNewCard);
  setButtonDisabled(buttonNewCardSubmit, validateConfig.inactiveButtonClass);
  clearErrorMessages(formNewCard);
};

function setButtonCloseProfileListeners() {
  closePopup(profilePopup);
};

function setButtonNewCardCloseListeners() {
  closePopup(newCardPopup);
  setButtonDisabled(buttonNewCardSubmit, validateConfig.inactiveButtonClass);
};

function setFormNewCardListeners(evt) {
  handleAddCard(evt);
  setButtonDisabled(buttonNewCardSubmit, validateConfig.inactiveButtonClass);
};

function closePopupClickOverlay(evt) { //закрыть окно по клику на оверлей
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

loadCards(cardsInitial);
formProfile.addEventListener('submit', handleEditUserForm);
buttonEditProfile.addEventListener('click', setButtonEditProfileListeners);
buttonNewCardsAdd.addEventListener('click', setButtonNewCardAddListeners);
buttonCloseProfile.addEventListener('click', setButtonCloseProfileListeners);
buttonNewCardClose.addEventListener('click', setButtonNewCardCloseListeners);
formNewCard.addEventListener('submit', setFormNewCardListeners);
buttonImagePopupClose.addEventListener('click', function() {closePopup(imagePopup)});
profilePopup.addEventListener('mousedown', closePopupClickOverlay);
newCardPopup.addEventListener('mousedown', closePopupClickOverlay);
imagePopup.addEventListener('mousedown', closePopupClickOverlay);
