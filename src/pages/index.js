//импорты
import './index.css';
import { Card }  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Api } from '../components/Api.js';
import {
  nameInput,
  infoInput,
  buttonEditProfile,
  buttonNewCardsAdd,
  formNewCard,
  formProfile,
  validateConfig,
} from '../utils/constants.js';


//создание классов
const formProfileValidator = new FormValidator(validateConfig, formProfile);
const formNewCardValidator = new FormValidator(validateConfig, formNewCard);
const popupWithImage = new PopupWithImage('.image-popup');
const popupDeleteConfirm = new PopupWithConfirm({
  popupSelector: '.confirm-popup',
  handleSubmit: () => {
    popupDeleteConfirm.close();
  }
});

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'eb15ed8a-0dd7-4417-b669-3dcdaf5b9cc7',
    'Content-Type': 'application/json'
  }
})

const cardsList = new Section({ //добавление карточек
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem).createCard();
    cardsList.addItemToEnd(cardElement);
  },
}, '.elements');


api.getUserInfo() //загрузка информации о пользователе
.then((userData) => {
  userInfo.setUserInfo(userData)
  userInfo.setUserAvatar(userData);
})
.catch((err) => {
  console.log(err);
})

api.getCards() //загрузка карточек
.then((cards) => {
  cardsList.renderItems(cards);
})
.catch((err) => {
  console.log(err);
})






//______________________________________






const popupProfileEdit = new PopupWithForm({  //форма редактирования профиля
  popupSelector: '.profile-popup',
  handleSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    popupProfileEdit.close();
  }
})

const popupNewCardAdd = new PopupWithForm({ //форма для добавления новой карточки
  popupSelector: '.new-card',
  handleSubmit: (formData) => {
    cardsList.addItemToStart(createCard(formData).createCard());
    popupNewCardAdd.close();
  }
})

const userInfo = new UserInfo({ //данные о пользователе
  profileNameSelector: '.profile__title',
  profileInfoSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar'
})

function createCard(cardData) { //создание карточки
  const card = new Card({
    cardName: cardData.name,
    cardLink: cardData.link,
    handleCardClick: () => {
      popupWithImage.open(cardData.name, cardData.link);
    },
    handleOpenConfirmPopup: () => {
      popupDeleteConfirm.open();
    }
  }, '.template');
  return card;
}


//вызовы функций
popupProfileEdit.setEventListeners();
popupNewCardAdd.setEventListeners();
popupWithImage.setEventListeners();
formNewCardValidator.enableValidation();
formProfileValidator.enableValidation();
popupDeleteConfirm.setEventListeners();


//обработчики
function handleOpenNewCardPopup() {
  formNewCardValidator.clearErrorMessages();
  popupNewCardAdd.open()
};

function handleOpenEditProfilePopup() {
  const userNewInfo = userInfo.getUserInfo();
  nameInput.value = userNewInfo.profileName;
  infoInput.value = userNewInfo.profileInfo;
  formProfileValidator.clearErrorMessages();
  popupProfileEdit.open();
}


//слушатели
buttonEditProfile.addEventListener('click', handleOpenEditProfilePopup);
buttonNewCardsAdd.addEventListener('click',handleOpenNewCardPopup);
