//импорты
import './index.css';
import { Card }  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { cardsInitial } from '../utils/cardsInitial.js';
import {
  nameInput,
  infoInput,
  profileName,
  profileInfo,
  buttonEditProfile,
  buttonNewCardsAdd,
  formNewCard,
  newCardPopup,
  imagePopup,
  profilePopup,
  formProfile,
  validateConfig,
} from '../utils/constants.js';


//создание классов
const formProfileValidator = new FormValidator(validateConfig, formProfile);
const formNewCardValidator = new FormValidator(validateConfig, formNewCard);
const popupWithImage = new PopupWithImage(imagePopup);

const cardsList = new Section({ //добавление карточек
  items: cardsInitial,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardsList.addItemToEnd(cardElement);
  },
}, '.elements');

const popupProfileEdit = new PopupWithForm({  //форма редактирования профиля
  popupSelector: profilePopup,
  handleSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    popupProfileEdit.close();
  }
})

const popupNewCardAdd = new PopupWithForm({ //форма для добавления новой карточки
  popupSelector: newCardPopup,
  handleSubmit: (formData) => {
    const cardItemNew = new Section({
      items: [formData],
      renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        cardItemNew.addItemToStart(cardElement);
      },
    }, '.elements');
    cardItemNew.renderItems();
    popupNewCardAdd.close();
  }
})

const userInfo = new UserInfo({ //данные о пользователе
  profileName: profileName,
  profileInfo: profileInfo
})

function createCard(cardData) { //создание карточки
  const card = new Card({
    cardName: cardData.place,
    cardLink: cardData.link,
    handleCardClick: () => {
      popupWithImage.open(cardData.place, cardData.link);
    },
  }, '.template');
  return card.createCard();
}


//вызовы функций
popupProfileEdit.setEventListeners();
popupNewCardAdd.setEventListeners();
popupWithImage.setEventListeners();
cardsList.renderItems();
formNewCardValidator.enableValidation();
formProfileValidator.enableValidation();


//обработчики
function handleOpenNewCardPopup() {
  formNewCardValidator.setButtonDisabled();
  formNewCardValidator.clearErrorMessages();
  popupNewCardAdd.open()
};

function handleOpenEditProfilePopup() {
  formProfileValidator.setButtonEnabled();
  formProfileValidator.clearErrorMessages();
  const userNewInfo = userInfo.getUserInfo();
  nameInput.value = userNewInfo.profileName;
  infoInput.value = userNewInfo.profileInfo;
  popupProfileEdit.open();
}


//слушатели
buttonEditProfile.addEventListener('click', handleOpenEditProfilePopup);
buttonNewCardsAdd.addEventListener('click',handleOpenNewCardPopup);
