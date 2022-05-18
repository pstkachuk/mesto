export const nameInput = document.getElementById('name');
export const infoInput = document.getElementById('info');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonNewCardsAdd = document.querySelector('.profile__add-button');
export const formNewCard = document.querySelector('.new-card__form');
export const formProfile = document.querySelector('.profile-popup__form');
export const validateConfig = { //настройки валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
