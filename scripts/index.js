let formElement = document.querySelector('.popup__form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('info');
let profileName = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__subtitle');


// открытие/закрытие окна
function openClosePopup() {  //функция открывает/закрывает "попап"
  let popup = document.querySelector('.popup');
  popup.classList.toggle('popup_opened');
    //поля формы заполняются значениями со страницы
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openClosePopup);    //клик на кнопку __edit-button
let closeButton = document.querySelector('.popup__close-button');
closeButton.addEventListener('click', openClosePopup);    //клик на кнопку __close-button
//

//сохранение введенных данных
function formSubmitHandler (evt) {  //функция отправки формы и сохранения введенных данных
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  openClosePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
//
