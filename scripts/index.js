// Variables
const btnEdit = document.querySelector('.profile__edit-btn')
const popupEdit = document.getElementById('popup-edit')
const btnClose = document.querySelector('.popup__close-btn')
let profileNameText = document.querySelector('.profile__name')
let profileDescriptionText = document.querySelector('.profile__description')
let profileNameInputField = document.getElementById('profile-name')
let profileDescriptionInputField = document.getElementById('profile-description')
const formElement = document.querySelector('.popup__form')

function displayNone($el) {
  $el.classList.remove('popup_opened')
}

function displayBlock($el) {
  // Assign current profile values to form input fields
  profileNameInputField.value = profileNameText.textContent
  profileDescriptionInputField.value = profileDescriptionText.textContent
  $el.classList.add('popup_opened')
}

// Edit Form Handler - saving new values from input
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileNameText.textContent = profileNameInputField.value
  profileDescriptionText.textContent = profileDescriptionInputField.value
  displayNone(popupEdit)
}

// Event listeners
btnEdit.addEventListener('click', () => displayBlock(popupEdit))
btnClose.addEventListener('click', () => displayNone(popupEdit))
formElement.addEventListener('submit', formSubmitHandler)