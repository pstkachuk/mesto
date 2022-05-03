//импорты
import { Card}  from './Card.js';
import { FormValidator } from './FormValidator.js';
import { cardsInitial } from './cardsInitial.js';

//константы
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
const placeInput = document.getElementById('place');
const linkInput = document.getElementById('link');
export const imagePopup = document.querySelector('.image-popup');
const buttonImagePopupClose = document.querySelector('.image-popup__close-button');
export const popupImage = document.querySelector('.image-popup__image');
export const imageCaption = document.querySelector('.image-popup__caption');
const cardsContainer = document.querySelector('.elements');
const profilePopup = document.querySelector('.profile-popup');
const formProfile = document.querySelector('.profile-popup__form');
const validateConfig = { //настройки валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
const formProfileValidator = new FormValidator(validateConfig, formProfile);
const formNewCardValidator = new FormValidator(validateConfig, formNewCard);


//функции
function createCard(cardData) {
  const card = new Card(cardData.name, cardData.link, openPopup, '.template');
  return card.createCard();
}

function loadCards(cardsList) { //при загрузке страницы добавляет 6 карточек
  cardsList.forEach((item) => {
    const cardElement = createCard(item);
    cardsContainer.append(cardElement);
  })
};

function openPopup(popupName) { // открытие окна
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
};

function closePopup(popupName) { //закрытие окна
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc);
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
  const dataNewCard = {
    name: placeInput.value,
    link: linkInput.value
  };
  const cardElement = createCard(dataNewCard);
  cardsContainer.prepend(cardElement);
  closePopup(newCardPopup);
};

function handleClosePopupByEsc (evt) { //закрыть окно клавишей ESC
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  };
};

function handleClosePopupClickOverlay(evt) { //закрыть окно по клику на оверлей
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

function setButtonEditProfileListeners() {
  loadUserInfo();
  formProfileValidator.setButtonEnabled(); // разблокировать кнопку отправки после закрытия невалидной формы
  formProfileValidator.clearErrorMessages(formProfile);
  openPopup(profilePopup);
};

function setButtonNewCardAddListeners() {
  formNewCard.reset();
  formNewCardValidator.setButtonDisabled();
  formNewCardValidator.clearErrorMessages(formNewCard);
  openPopup(newCardPopup);
};

function setButtonCloseProfileListeners() {
  closePopup(profilePopup);
};

function setButtonImagePopupCloseListeners() {
  closePopup(imagePopup);
}

function setButtonNewCardCloseListeners() {
  closePopup(newCardPopup);
  formNewCardValidator.setButtonDisabled();
};

function setFormNewCardListeners(evt) {
  handleAddCard(evt);
  formNewCardValidator.setButtonDisabled();
};

//вызовы функций
loadCards(cardsInitial);
formNewCardValidator.enableValidation(); //запуск валидации формы
formProfileValidator.enableValidation();

//слушатели
formProfile.addEventListener('submit', handleEditUserForm);
buttonEditProfile.addEventListener('click', setButtonEditProfileListeners);
buttonNewCardsAdd.addEventListener('click', setButtonNewCardAddListeners);
buttonCloseProfile.addEventListener('click', setButtonCloseProfileListeners);
buttonNewCardClose.addEventListener('click', setButtonNewCardCloseListeners);
formNewCard.addEventListener('submit', setFormNewCardListeners);
buttonImagePopupClose.addEventListener('click', setButtonImagePopupCloseListeners);
profilePopup.addEventListener('mousedown', handleClosePopupClickOverlay);
newCardPopup.addEventListener('mousedown', handleClosePopupClickOverlay);
imagePopup.addEventListener('mousedown', handleClosePopupClickOverlay);
