let formElement = document.querySelector('.popup__form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('info');
let profileName = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

// открытие/закрытие окна
function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
  }
  
  popup.classList.toggle('popup_opened');
}
//

//сохранение введенных данных
function formSubmitHandler (evt) {  //функция отправки формы и сохранения введенных данных
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  togglePopup();
}
//

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
