import { Card } from "./Card.js"
import { FormValidator } from './FormValidator.js'
import { initialCards, settings } from "./cards.js"

// Variables
const btnEdit = document.querySelector('.profile__edit-btn')
const btnsClose = document.querySelectorAll('.popup__close-btn')
const btnAddElement = document.querySelector('.profile__add-btn')
const popups = document.querySelectorAll('.popup')
const popupEdit = document.getElementById('popup-edit')
const popupAdd = document.getElementById('popup-add')
const formEdit = popupEdit.querySelector('.popup__form')
const formAdd = popupAdd.querySelector('.popup__form')
const btnSaveProfile = formEdit.querySelector('.popup__save-btn')
const btnSaveNewCard = formAdd.querySelector('.popup__save-btn')
const profileNameText = document.querySelector('.profile__name')
const profileDescriptionText = document.querySelector('.profile__description')
const profileNameInputField = document.getElementById('profile-name')
const profileDescriptionInputField = document.getElementById('profile-description')
const elementsGrid = document.querySelector('.elements-grid')
const cardNameInputField = document.getElementById('card-name')
const cardLinkInputField = document.getElementById('card-link')
export const popupImage = document.getElementById('popup-image')
export const popupImageCaption = document.querySelector('.popup__image-caption')
export const popupImageCard = document.querySelector('.popup__image')
/////////////////////////////////////

const editFormValidation = new FormValidator(settings, formEdit)
editFormValidation.enableValidation()

const addFormValidation = new FormValidator(settings, formAdd)
addFormValidation.enableValidation()

///////////////////////////////////

// Close popups
function closePopup(el) {
  el.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

// Open Popups
export function openPopup(el) {
  el.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
}

// Edit Form Handler - saving new values from input
function handleEditFormSubmitBtn(evt) {
  evt.preventDefault()
  profileNameText.textContent = profileNameInputField.value
  profileDescriptionText.textContent = profileDescriptionInputField.value
  closePopup(popupEdit)
}

// Add Form Handler - User cards rendered with info from input fields
function handleAddFormSubmitBtn(evt) {
  evt.preventDefault()
  const userCard = {
    name: cardNameInputField.value,
    link: cardLinkInputField.value
  }
  addCardToContainer(userCard, elementsGrid)
  closePopup(popupAdd)
  formAdd.reset()
}

// Adding rendered cards to ul container
function addCardToContainer(card, container) {
  const cardElement = new Card(card, '#card-template')
  container.prepend(cardElement.createCard())
}

// Event listeners
btnEdit.addEventListener('click', () => {
  profileNameInputField.value = profileNameText.textContent
  profileDescriptionInputField.value = profileDescriptionText.textContent
  editFormValidation.resetError()
  editFormValidation.switchSaveBtnState(btnSaveProfile)
  openPopup(popupEdit)
})

btnAddElement.addEventListener('click', () => {
  cardLinkInputField.value = ''
  cardNameInputField.value = ''
  addFormValidation.resetError()
  addFormValidation.switchSaveBtnState(btnSaveNewCard)
  openPopup(popupAdd)
})

btnsClose.forEach(btn => {
  btn.addEventListener('click', () => {
    const popup = btn.closest('.popup')
    closePopup(popup)
  })
})
formEdit.addEventListener('submit', handleEditFormSubmitBtn)
formAdd.addEventListener('submit', handleAddFormSubmitBtn)

// Popups closing by click on overlay
popups.forEach(popup => {
  popup.addEventListener('mousedown', (e) => {
    e.target === popup ? closePopup(popup) : null
  })
})

// Popups closing by Esc
function closePopupByEsc(e) {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

// Render initial cards
initialCards.forEach(card => {
  addCardToContainer(card, elementsGrid)
})






