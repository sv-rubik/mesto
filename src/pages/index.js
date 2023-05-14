import {Card} from "../scripts/Card.js"
import {FormValidator} from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js'
import UserInfo from '../scripts/UserInfo.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import {initialCards, settings} from "../scripts/utils/cards.js"
import {btnEdit, btnAddElement, formEdit, formAdd, btnSaveProfile, btnSaveNewCard, profileNameText} from "../scripts/utils/constants.js"
import {profileDescriptionText, profileNameInputField, profileDescriptionInputField} from "../scripts/utils/constants.js"
import './index.css'
/////////////////////////////////// Create popup with for Edit-form
const userInfo = new UserInfo(profileNameText, profileDescriptionText)

const popupWithEditForm = new PopupWithForm('#popup-edit', {
  handleFormSubmit: (profileInputsData) => {
    userInfo.setUserInfo({
      profileName: profileInputsData.name,
      profileDescription: profileInputsData.description
    })
    popupWithEditForm.close()
  }
})
popupWithEditForm.setEventListeners()

btnEdit.addEventListener('click', () => {
  popupWithEditForm.open()
  const { profileName, profileDescription } = userInfo.getUserInfo()
  profileNameInputField.value = profileName
  profileDescriptionInputField.value = profileDescription
  editFormValidation.resetError()
  editFormValidation.switchSaveBtnState(btnSaveProfile)
})

///////////////////////////////////////Create popup to add card
const popupWithAddForm = new PopupWithForm('#popup-add', {
  handleFormSubmit: (addCardInputsData) => {
    renderInitialCards.addItem(renderCard({
      name: addCardInputsData.title,
      link: addCardInputsData.link
    }))
    popupWithAddForm.close()
  }
})
popupWithAddForm.setEventListeners();

btnAddElement.addEventListener('click', () => {
  popupWithAddForm.open()
  addFormValidation.resetError()
  addFormValidation.switchSaveBtnState(btnSaveNewCard)
})

////////////////////////////////////// Create popup with Image instance and add caption and link from card
const popupWithImage = new PopupWithImage('#popup-image')
popupWithImage.setEventListeners()
const handleCardClick = function (title, link) {
  popupWithImage.open(title, link)
}

// Render each separate card with Card class
function renderCard(cardsArray) {
  const cardElement = new Card(cardsArray, '#card-template', handleCardClick)
  return cardElement.createCard()
}

// Render initial cards with Section class instance
const renderInitialCards = new Section({
  initialCards: initialCards,
  renderer: (cardsArray) => {
    renderInitialCards.addItem(renderCard(cardsArray))
  }
}, '.elements-grid')
renderInitialCards.renderItems()

///////////////////////////////////// Validation
const editFormValidation = new FormValidator(settings, formEdit)
editFormValidation.enableValidation()

const addFormValidation = new FormValidator(settings, formAdd)
addFormValidation.enableValidation()