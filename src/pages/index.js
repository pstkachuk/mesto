//импорты
import { Card}  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { cardsInitial } from '../utils/cardsInitial.js';
import {
  nameInput,
  infoInput,
  profileName,
  profileInfo,
  buttonEditProfile,
  buttonCloseProfile,
  buttonNewCardsAdd,
  buttonNewCardClose,
  formNewCard,
  newCardPopup,
  placeInput,
  linkInput,
  imagePopup,
  buttonImagePopupClose,
  cardsContainer,
  profilePopup,
  formProfile,
  validateConfig,
} from '../utils/constants.js';

//создание классов
const formProfileValidator = new FormValidator(validateConfig, formProfile);

const formNewCardValidator = new FormValidator(validateConfig, formNewCard);

const cardsList = new Section({ //добавление карточек
  items: cardsInitial,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardsList.addItemToEnd(cardElement);
  },
}, '.elements');

const popupProfileEdit = new Popup(profilePopup);
popupProfileEdit.setEventListeners();
buttonEditProfile.addEventListener('click', () => {popupProfileEdit.open()});


//функции
function createCard(cardData) { //создание карточки
  const card = new Card(cardData.name, cardData.link, openPopup, '.template');
  return card.createCard();
}

function openPopup(popupName) { // открытие окна
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
};

// function closePopup(popupName) { //закрытие окна
//   popupName.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleClosePopupByEsc);
// };

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

function handleAddCard (evt) { //добавление новой карточки пользователем
  evt.preventDefault();
  const dataNewCard = [{
    name: placeInput.value,
    link: linkInput.value
  }];
  const cardElementNew = new Section({
    items: dataNewCard,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardElementNew.addItemToStart(cardElement);
    }
  }, '.elements');
  cardElementNew.renderItems();
  closePopup(newCardPopup);
};

// function handleClosePopupByEsc (evt) { //закрыть окно клавишей ESC
//   if (evt.key === 'Escape') {
//     const currentPopup = document.querySelector('.popup_opened');
//     closePopup(currentPopup);
//   };
// };

// function handleClosePopupClickOverlay(evt) { //закрыть окно по клику на оверлей
//   if (evt.target.classList.contains('popup_opened')) {
//     closePopup(evt.target);
//   };
// };

function handleOpenEditProfilePopup() {
  loadUserInfo();
  formProfileValidator.setButtonEnabled(); // разблокировать кнопку отправки после закрытия невалидной формы
  formProfileValidator.clearErrorMessages(formProfile);
  openPopup(profilePopup);
};

function handleOpenNewCardPopup() {
  formNewCard.reset();
  formNewCardValidator.setButtonDisabled();
  formNewCardValidator.clearErrorMessages(formNewCard);
  openPopup(newCardPopup);
};

// function handleCloseEditProfilePopup() {
//   closePopup(profilePopup);
// };

function handleCloseImagePopup() {
  closePopup(imagePopup);
}

function handleCloseNewCardPopup() {
  closePopup(newCardPopup);
  formNewCardValidator.setButtonDisabled();
};

function handleNewCardForm(evt) {
  handleAddCard(evt);
  formNewCardValidator.setButtonDisabled();
};

//вызовы функций
cardsList.renderItems();
formNewCardValidator.enableValidation(); //запуск валидации формы
formProfileValidator.enableValidation();

//слушатели
formProfile.addEventListener('submit', handleEditUserForm);
// buttonEditProfile.addEventListener('click', handleOpenEditProfilePopup);
buttonNewCardsAdd.addEventListener('click', handleOpenNewCardPopup);
// buttonCloseProfile.addEventListener('click', handleCloseEditProfilePopup);
buttonNewCardClose.addEventListener('click', handleCloseNewCardPopup);
formNewCard.addEventListener('submit', handleNewCardForm);
buttonImagePopupClose.addEventListener('click', handleCloseImagePopup);
// profilePopup.addEventListener('mousedown', handleClosePopupClickOverlay);
// newCardPopup.addEventListener('mousedown', handleClosePopupClickOverlay);
// imagePopup.addEventListener('mousedown', handleClosePopupClickOverlay);
