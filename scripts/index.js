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


function loadCards() { //при загрузке страницы добавляет 6 карточек
  for (let i = 0; i < initialCards.length; i++) {
    const element = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
    element.querySelector('.element__image').src = initialCards[i].link;
    element.querySelector('.element__image').alt = initialCards[i].name;
    element.querySelector('.element__caption').textContent = initialCards[i].name;
    elementsList.append(element);
    element.querySelector('.element__image').addEventListener('click', openImagePopup);
    element.querySelector('.element__like-button').addEventListener('click', like);
    element.querySelector('.element__delete-button').addEventListener('click', function() {
      element.remove();
    } );
  }
}

function togglePopup() { // открытие/закрытие окна профиля
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function toggleNewCardPopup() { //открытие/закрытие окна добавления новой карточки
  newCardPopup.classList.toggle('popup_opened');
  placeInput.value = '';
  linkInput.value = '';
}

function formSubmitHandler (evt) {  //функция отправки формы и сохранения введенных данных
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  togglePopup();
}

function formNewCardHandler (evt) { //добавление новой карточки
  evt.preventDefault();
  const element = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  element.querySelector('.element__caption').textContent = placeInput.value;
  element.querySelector('.element__image').src = linkInput.value;
  element.querySelector('.element__image').alt = placeInput.value;
  elementsList.prepend(element);
  toggleNewCardPopup();
  element.querySelector('.element__image').addEventListener('click', openImagePopup);
  element.querySelector('.element__like-button').addEventListener('click', like);
  element.querySelector('.element__delete-button').addEventListener('click', function() {
    element.remove();
  } );
}

function like(event) { //поставить лайк
  event.target.classList.toggle('element__like-button_active');
}

function openImagePopup(event) { //открыть/закрыть изображение
  image.src = event.target.src;
  imageCaption.textContent = event.target.alt;
  imagePopup.classList.add('popup_opened');
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
};

loadCards();
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
addButton.addEventListener('click', toggleNewCardPopup);
newCardCloseButton.addEventListener('click', toggleNewCardPopup);
formNewCard.addEventListener('submit', formNewCardHandler);
imagePopupCloseButton.addEventListener('click', closeImagePopup);
