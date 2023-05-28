import {Card} from "../components/Card.js"
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithQuestion from '../components/PopupWithQuestion.js'
import {initialCards, settings} from "../utils/cards.js"
import {btnEdit, btnAddElement, formEdit, formAdd, formAvatar, btnSaveProfile, btnSaveNewCard, profileNameText} from "../utils/constants.js"
import {profileDescriptionText, profileNameInputField, profileDescriptionInputField} from "../utils/constants.js"
import {popupAvatar, formAvatarEdit, btnEditAvatar} from "../utils/constants.js"

import './index.css'
import {api} from "../components/Api"

///////////////////////////////////////// USER DATA
let userId

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
})

/////////////////////////////////// Create popup with for Edit-form
const popupWithEditForm = new PopupWithForm('#popup-edit', {
  handleFormSubmit: (profileInputsData) => {
    popupWithEditForm.showSavingNotification()
    api.sendUserData(profileInputsData)
      .then((res) => {
        userInfo.setUserInfo({
          profileName: res.name,
          profileDescription: res.about})
      })
      .catch((err) => {
        console.log(`There is an error in editing profile: ${err}`)
      })
      .finally(() => {
        popupWithEditForm.closeSavingNotification()
        popupWithEditForm.close()
      })
  }
})
popupWithEditForm.setEventListeners()

btnEdit.addEventListener('click', () => {
  popupWithEditForm.open()
  const {profileName, profileDescription} = userInfo.getUserInfo()
  profileNameInputField.value = profileName
  profileDescriptionInputField.value = profileDescription
  editFormValidation.resetError()
  editFormValidation.switchSaveBtnState()
})

/////////////////////////////////////// Create popup to add card
const popupWithAddForm = new PopupWithForm('#popup-add', {
  handleFormSubmit: (addCardInputsData) => {
    api.addNewCard({
      name: addCardInputsData.title,
      link: addCardInputsData.link
    })
      .then((card) => {
        renderInitialCards.addItem(renderCard(card))})
      .catch((err) => {console.log(`There is an error in posting card: ${err}`)})
      .finally(() => {
        popupWithAddForm.showSavingNotification()
        popupWithAddForm.close()
      })
  }
})
popupWithAddForm.setEventListeners()

btnAddElement.addEventListener('click', () => {
  popupWithAddForm.open()
  addFormValidation.resetError()
  addFormValidation.switchSaveBtnState()
})

////////////////////////////////////// Create Image popup and add caption and link from card
const popupWithImage = new PopupWithImage('#popup-image')
popupWithImage.setEventListeners()

const handleCardClick = function (title, link) {
  popupWithImage.open(title, link)
}

const handleCardDelete = function (cardElement, cardID) {
  popupWithQuestion.open(cardID, cardElement)
}

// Render each separate card with Card class
function renderCard(cardData) {
  const cardElement = new Card(cardData, userId, '#card-template',
    handleCardClick, handleCardDelete,
    // add likes
    (cardId) => {
      api.addCardLike(cardId)
      .then((res) => {cardElement.showNumberOfLikes(res)})
      .catch((err) => { console.log(`There is an error with like add: ${err}`) })
    },
    // remove likes
    (cardId) => {
      api.deleteCardLike(cardId)
      .then((res) => {cardElement.showNumberOfLikes(res)})
      .catch((err) => { console.log(`There is an error with like remove: ${err}`) })
    }
  )
  return cardElement.createCard()
}

//////////////////////////////////// Create popup with AVATAR change
const popupWithAvatar = new PopupWithForm('#popup-avatar', {
  handleFormSubmit: (addAvatarLink) => {
    popupWithAvatar.showSavingNotification()
    api.sendAvatarLink(addAvatarLink)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar)
      popupWithAvatar.close()
    })
    .catch((err) => { console.log(`There is an error in avatar change:  ${err}`) })
    .finally(() => {
      popupWithAvatar.closeSavingNotification()
    })
  }
})
popupWithAvatar.setEventListeners()

btnEditAvatar.addEventListener('click', () => {
  popupWithAvatar.open()
  addFormValidation.resetError()
  addFormValidation.switchSaveBtnState()
})

//////////////////////////////////// Create popup with deletion confirmation QUESTION
const popupWithQuestion = new PopupWithQuestion('#card-delete')
popupWithQuestion.setSubmitAction((cardId, cardObject) => {
  // Logic for submit button
  api.deleteCard(cardId)
    .then(() => {
      cardObject.deleteCard()
      popupWithQuestion.close()
    })
    .catch((err) => { console.log(`There is an error when deleting card: ${err}`) })
})

popupWithQuestion.setEventListeners()

////////////////////////////////////// INITIAL CARDS & avatar
// Render any cards with Section class instance
const renderInitialCards = new Section({
  renderer: (item) => {
    renderInitialCards.addItem(renderCard(item))
  }
}, '.elements-grid')

//Get initial cards from server & render them with Section instance
api.getInitialCards().then((resCardsData) => {
  renderInitialCards.renderItems(resCardsData)
})
  .catch((err) => { console.log(`Error: ${err}`) })

//Get profile data & avatar from server
api.getUserData().then((resUserData) => {
  userId = resUserData._id
  userInfo.setUserInfo({
    profileName: resUserData.name,
    profileDescription: resUserData.about
  })
  userInfo.setUserAvatar(resUserData.avatar)
})
  .catch((err) => { console.log(`Error: ${err}`) })

///////////////////////////////////// Validation
const editFormValidation = new FormValidator(settings, formEdit)
editFormValidation.enableValidation()

const addFormValidation = new FormValidator(settings, formAdd)
addFormValidation.enableValidation()

const avatarFormValidation = new FormValidator(settings, formAvatar)
avatarFormValidation.enableValidation()