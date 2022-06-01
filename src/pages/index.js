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

let userId = null;

//создание классов
const formProfileValidator = new FormValidator(validateConfig, formProfile);
const formNewCardValidator = new FormValidator(validateConfig, formNewCard);
const popupWithImage = new PopupWithImage('.image-popup');
const popupDeleteConfirm = new PopupWithConfirm({popupSelector: '.confirm-popup'});

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'eb15ed8a-0dd7-4417-b669-3dcdaf5b9cc7',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({ //данные о пользователе
  profileNameSelector: '.profile__title',
  profileInfoSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar'
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
  userId = userData._id;
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

const popupProfileEdit = new PopupWithForm({  //форма редактирования профиля
  popupSelector: '.profile-popup',
  handleSubmit: (formData) => {
    api.setUserInfo(formData.name, formData.about)
    .then((formDataUpdate) => {
      userInfo.setUserInfo(formDataUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
    popupProfileEdit.close();
  }
})

const popupNewCardAdd = new PopupWithForm({ //форма для добавления новой карточки
  popupSelector: '.new-card',
  handleSubmit: (formData) => {
    api.addNewCard(formData.name, formData.link)
      .then((cardNew) => {
        cardsList.addItemToStart(createCard(cardNew).createCard());
      })
      .catch((err) => {
        console.log(err);
      });
    popupNewCardAdd.close();
  }
})

function createCard(cardData) { //создание карточки
  const card = new Card({
    cardName: cardData.name,
    cardLink: cardData.link,
    cardLikes: cardData.likes,
    userId,
    ownerId: cardData.owner._id,
    cardId: cardData._id,
    handleCardClick: () => {
      popupWithImage.open(cardData.name, cardData.link);
    },
    handleDeleteClick: () => {
      popupDeleteConfirm.handleSubmit(() => {
        api.deleteCard(cardData._id)
        .then(() => {
          card.removeCard();
          popupDeleteConfirm.close();
        })
        .catch((err) => {
          console.log(err);
        });
      })
      popupDeleteConfirm.open();
    },
    handleLikeClick: () => {
      card.handleLike();
    }
  },
    api,
    '.template');
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
