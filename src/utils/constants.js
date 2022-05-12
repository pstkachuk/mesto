export const nameInput = document.getElementById('name');
export const infoInput = document.getElementById('info');
export const profileName = document.querySelector('.profile__title');
export const profileInfo = document.querySelector('.profile__subtitle');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonCloseProfile = document.querySelector('.popup__close-button');
export const buttonNewCardsAdd = document.querySelector('.profile__add-button');
export const buttonNewCardClose = document.querySelector('.new-card__close-button');
export const formNewCard = document.querySelector('.new-card__form');
export const newCardPopup = document.querySelector('.new-card');
export const placeInput = document.getElementById('place');
export const linkInput = document.getElementById('link');
export const imagePopup = document.querySelector('.image-popup');
export const buttonImagePopupClose = document.querySelector('.image-popup__close-button');
export const popupImage = document.querySelector('.image-popup__image');
export const imageCaption = document.querySelector('.image-popup__caption');
export const cardsContainer = document.querySelector('.elements');
export const profilePopup = document.querySelector('.profile-popup');
export const formProfile = document.querySelector('.profile-popup__form');
export const validateConfig = { //настройки валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
