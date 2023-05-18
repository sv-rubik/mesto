import {Card} from "../components/Card.js"
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import {initialCards, settings} from "../utils/cards.js"
import {btnEdit, btnAddElement, formEdit, formAdd, btnSaveProfile, btnSaveNewCard, profileNameText} from "../utils/constants.js"
import {profileDescriptionText, profileNameInputField, profileDescriptionInputField} from "../utils/constants.js"
import './index.css'
/////////////////////////////////// Create popup with for Edit-form
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
})

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
  editFormValidation.switchSaveBtnState()
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
  addFormValidation.switchSaveBtnState()
})

////////////////////////////////////// Create popup with Image instance and add caption and link from card
const popupWithImage = new PopupWithImage('#popup-image')
popupWithImage.setEventListeners()
const handleCardClick = function (title, link) {
  popupWithImage.open(title, link)
}

// Render each separate card with Card class
function renderCard(item) {
  const cardElement = new Card(item, '#card-template', handleCardClick)
  return cardElement.createCard()
}

// Render initial cards with Section class instance
const renderInitialCards = new Section({
  initialCards: initialCards,
  renderer: (item) => {
    renderInitialCards.addItem(renderCard(item))
  }
}, '.elements-grid')
renderInitialCards.renderItems()

///////////////////////////////////// Validation
const editFormValidation = new FormValidator(settings, formEdit)
editFormValidation.enableValidation()

const addFormValidation = new FormValidator(settings, formAdd)
addFormValidation.enableValidation()