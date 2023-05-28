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
          popupWithEditForm.close()
      })
      .catch((err) => {
        console.log(`There is an error in editing profile: ${err}`)
      })
      .finally(() => {
        popupWithEditForm.closeSavingNotification()
      })
  }
})
popupWithEditForm.setEventListeners()

btnEdit.addEventListener('click', () => {
  popupWithEditForm.open()
  const {profileName, profileDescription} = userInfo.getUserInfo()
  profileNameInputField.value = profileName
  profileDescriptionInputField.value = profileDescription
  formEditValidation.resetError()
  formEditValidation.switchSaveBtnState()
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
  formAddValidation.resetError()
  formAddValidation.switchSaveBtnState()
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
  formAddValidation.resetError()
  formAddValidation.switchSaveBtnState()
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

//Get initial cards and profile data simultaneously using Promise.all
Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([resCardsData, resUserData]) => {
    // Set user info and avatar
    userId = resUserData._id
    userInfo.setUserInfo({
      profileName: resUserData.name,
      profileDescription: resUserData.about
    })
    userInfo.setUserAvatar(resUserData.avatar)
    renderInitialCards.renderItems(resCardsData.reverse())
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })

///////////////////////////////////// Validation
const formEditValidation = new FormValidator(settings, formEdit)
formEditValidation.enableValidation()

const formAddValidation = new FormValidator(settings, formAdd)
formAddValidation.enableValidation()

const formAvatarValidation = new FormValidator(settings, formAvatar)
formAvatarValidation.enableValidation()