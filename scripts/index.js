const nameInput = document.getElementById('name');
const infoInput = document.getElementById('info');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-button');
const buttonNewCarsAdd = document.querySelector('.profile__add-button');
const buttonNewCardClose = document.querySelector('.new-card__close-button');
const formNewCard = document.querySelector('.new-card__form');
const newCardPopup = document.querySelector('.new-card');
const buttonNewCardSubmit = document.querySelector('.new-card__submit-button');
const placeInput = document.getElementById('place');
const linkInput = document.getElementById('link');
const imagePopup = document.querySelector('.image-popup');
const buttonImagePopupClose = document.querySelector('.image-popup__close-button');
const image = document.querySelector('.image-popup__image');
const imageCaption = document.querySelector('.image-popup__caption');
const cardsInitial = [
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
const profilePopup = document.querySelector('.profile-popup');
const formProfile = document.querySelector('.profile-popup__form');
const buttonProfileSubmit = document.querySelector('.popup__submit-button');

function createCard(cardName, cardLink) { //создание карточки
  const element = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  const image = element.querySelector('.element__image');
  image.src = cardLink;
  image.alt = cardName;
  element.querySelector('.element__caption').textContent = cardName;
  image.addEventListener('click', openImagePopup(cardName, cardLink));
  element.querySelector('.element__like-button').addEventListener('click', like);
  element.querySelector('.element__delete-button').addEventListener('click', removeCard(element));
  return element;
};

function removeCard(element) { //удаление карточки
  return function() {
    element.remove();
  };
};

function loadCards() { //при загрузке страницы добавляет 6 карточек
  cardsInitial.forEach(function(item) {
    const element = createCard(item.name, item.link);
    elementsList.append(element);
  });
};

function openPopup(popupName) { // открытие окна
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popupName) { //закрытие окна
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function resetForm(formElement) { //очистить форму
  formElement.reset();
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
  const element = createCard(placeInput.value, linkInput.value);
  elementsList.prepend(element);
  closePopup(newCardPopup);
};

function like(event) { //поставить лайк
  event.target.classList.toggle('element__like-button_active');
};

function openImagePopup(name, link) { //открыть изображение
  return function() {
    image.src = link;
    imageCaption.textContent = name;
    openPopup(imagePopup);
  };
};

function closePopupByEsc (evt) { //закрыть окно клавишей ESC
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  };
};

loadCards();
formProfile.addEventListener('submit', handleEditUserForm);
buttonEditProfile.addEventListener('click', function() {openPopup(profilePopup)});
buttonEditProfile.addEventListener('click', loadUserInfo);
buttonNewCarsAdd.addEventListener('click', function() {openPopup(newCardPopup)});
buttonNewCarsAdd.addEventListener('click', function() {resetForm(formNewCard)});
buttonCloseProfile.addEventListener('click', function() {closePopup(profilePopup)});
buttonCloseProfile.addEventListener('click', () => {clearErrorMessages(formProfile)}); //очистить сообщения об ошибках при закрытии формы
buttonCloseProfile.addEventListener('click', () => {setButtonEnabled(buttonProfileSubmit)}); // разблокировать кнопку отправки после закрытия невалидной формы
buttonNewCardClose.addEventListener('click', function() {closePopup(newCardPopup)});
buttonNewCardClose.addEventListener('click', () => {setButtonDisabled(buttonNewCardSubmit)});
buttonNewCardClose.addEventListener('click', () => {clearErrorMessages(formNewCard)});
formNewCard.addEventListener('submit', handleAddCard);
formNewCard.addEventListener('submit', () => {setButtonDisabled(buttonNewCardSubmit)});
buttonImagePopupClose.addEventListener('click', function() {closePopup(imagePopup)});
profilePopup.addEventListener('mousedown', function(evt) {closePopup(evt.target)}); //закрытие окна при клике на "оверлей"
newCardPopup.addEventListener('mousedown', function(evt) {closePopup(evt.target)}); //закрытие окна при клике на "оверлей"
imagePopup.addEventListener('mousedown', function(evt) {closePopup(evt.target)}); //закрытие окна при клике на "оверлей"
