//импорты
import './index.css';
import { Card }  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';
import {
  nameInput,
  infoInput,
  buttonEditProfile,
  buttonNewCardsAdd,
  buttonSetAvatar,
  formNewCard,
  formProfile,
  formSetAvatar,
  validateConfig,
} from '../utils/constants.js';

let userId = null;

//создание классов
const formProfileValidator = new FormValidator(validateConfig, formProfile);
const formNewCardValidator = new FormValidator(validateConfig, formNewCard);
const formSetAvatarValidator = new FormValidator(validateConfig, formSetAvatar);
const popupWithImage = new PopupWithImage('.image-popup');
const popupDeleteConfirm = new PopupWithConfirmation({popupSelector: '.confirm-popup'});

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


api.getAllData() //получить все данные пользователя и карточки
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  })

const popupProfileEdit = new PopupWithForm({  //форма редактирования профиля
  popupSelector: '.profile-popup',
  handleSubmit: (formData) => {
    popupProfileEdit.renderLoading(true);
    api.setUserInfo(formData.name, formData.about)
    .then((formDataUpdate) => {
      userInfo.setUserInfo(formDataUpdate);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfileEdit.renderLoading(false);
        popupProfileEdit.close();
      });
  }
})

const popupNewCardAdd = new PopupWithForm({ //форма для добавления новой карточки
  popupSelector: '.new-card',
  handleSubmit: (formData) => {
    popupNewCardAdd.renderLoading(true);
    api.addNewCard(formData['card-name'], formData.link)
      .then((cardNew) => {
        cardsList.addItemToStart(createCard(cardNew).createCard());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewCardAdd.renderLoading(false);
        popupNewCardAdd.close();
      });
  }
})

const popupSetAvatar = new PopupWithForm ({
  popupSelector: '.avatar-popup',
  handleSubmit: (formData) => {
    popupSetAvatar.renderLoading(true);
    api.setAvatar(formData['avatar-link'])
      .then((newAvatar) => {
        userInfo.setUserAvatar(newAvatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupSetAvatar.renderLoading(false);
        popupSetAvatar.close();
      });
    }
  }
)

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
        popupDeleteConfirm.renderLoading(true);
        api.deleteCard(cardData._id)
        .then(() => {
          card.removeCard();
          popupDeleteConfirm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupDeleteConfirm.close();
          popupDeleteConfirm.renderLoading(false);
        });
      })
      popupDeleteConfirm.open();
    },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api.deleteLike(cardData._id)
          .then((res) => {
            card.handleLike(res.likes)
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.like(cardData._id)
          .then((res) => {
            card.handleLike(res.likes)
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }, '.template');
  return card;
}


//вызовы функций
popupProfileEdit.setEventListeners();
popupNewCardAdd.setEventListeners();
popupWithImage.setEventListeners();
popupSetAvatar.setEventListeners();
formNewCardValidator.enableValidation();
formProfileValidator.enableValidation();
formSetAvatarValidator.enableValidation();
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

function handleOpenSetAvatarPopup () {
  formSetAvatarValidator.clearErrorMessages();
  popupSetAvatar.open();
}


//слушатели
buttonEditProfile.addEventListener('click', handleOpenEditProfilePopup);
buttonNewCardsAdd.addEventListener('click',handleOpenNewCardPopup);
buttonSetAvatar.addEventListener('click', handleOpenSetAvatarPopup);
