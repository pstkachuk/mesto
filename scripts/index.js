let formElement = document.querySelector('.popup__form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('info');
let profileName = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');
let newCardCloseButton = document.querySelector('.new-card__close-button');
let formNewCard = document.querySelector('.new-card__form');
let newCardPopup = document.querySelector('.new-card');
let placeInput = document.getElementById('place');
let linkInput = document.getElementById('link');
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
    const elements = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
    elements.querySelector('.element__image').src = initialCards[i].link;
    elements.querySelector('.element__image').alt = initialCards[i].name;
    elements.querySelector('.element__caption').textContent = initialCards[i].name;
    elementsList.append(elements);
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
  const elements = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  elements.querySelector('.element__caption').textContent = placeInput.value;
  elements.querySelector('.element__image').src = linkInput.value;
  elementsList.prepend(elements);
  toggleNewCardPopup();
}


loadCards();
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
addButton.addEventListener('click', toggleNewCardPopup);
newCardCloseButton.addEventListener('click', toggleNewCardPopup);
formNewCard.addEventListener('submit', formNewCardHandler);
