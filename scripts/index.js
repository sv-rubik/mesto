// Variables
const btnEdit = document.querySelector('.profile__edit-btn')
const popupEdit = document.getElementById('popup-edit')
const btnsClose = document.querySelectorAll('.popup__close-btn')
let profileNameText = document.querySelector('.profile__name')
let profileDescriptionText = document.querySelector('.profile__description')
let profileNameInputField = document.getElementById('profile-name')
let profileDescriptionInputField = document.getElementById('profile-description')
const formElement = document.querySelector('.popup__form')

const btnAddElement = document.querySelector('.profile__add-btn')
const popupAdd = document.getElementById('popup-add')
const elementsGrid = document.querySelector('.elements-grid')
const btnCreate = document.querySelector('.popup__create-btn')
let cardNameInputField = document.getElementById('card-name')
let cardLinkInputField = document.getElementById('card-link')
const popupImage = document.getElementById('popup-image')
const popupImageCaption = document.querySelector('.popup__image-caption')
const popupImageCard = document.querySelector('.popup__image')
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
]

// Close popups
function closePopup($el) {
  $el.classList.remove('popup_opened')
}

// Open Popups
function openPopup($el) {
  $el.classList.add('popup_opened')
}

// Edit Form Handler - saving new values from input
function formSubmitHandler (evt) {
  evt.preventDefault()
  profileNameText.textContent = profileNameInputField.value
  profileDescriptionText.textContent = profileDescriptionInputField.value
  closePopup(popupEdit)
}

// Event listeners
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit)
  profileNameInputField.value = profileNameText.textContent
  profileDescriptionInputField.value = profileDescriptionText.textContent
})

btnAddElement.addEventListener('click', () => openPopup(popupAdd))
formElement.addEventListener('submit', formSubmitHandler)

btnsClose.forEach(btn => {
  btn.addEventListener('click', () => {
    const popup = btn.closest('.popup')
    closePopup(popup)
  })
})

//Cards from JS to HTML and User card with deletion
function renderCard(arrayOfCards, ul) {
  const template = document.querySelector('#card-template').content
  arrayOfCards.forEach((card) => {
    const newElement = template.cloneNode(true)
    const image = newElement.querySelector('.element__image')
    const title = newElement.querySelector('.element__title')
    const btnTrash = newElement.querySelector('.element__trash')
    const btnLike = newElement.querySelector('.element__like')
    const elements = newElement.querySelectorAll('.element__image')
    image.src = card.link
    image.alt = card.name
    title.textContent = card.name
    ul.insertBefore(newElement, ul.firstChild)
    // Deletion of card
    btnTrash.addEventListener('click', (e) => {
      const element = e.target.closest('.element')
      element.remove()
    })
    // Cards likes
    btnLike.addEventListener('click', (e) => {
      e.target.classList.toggle('element__like_active')
    })
    // Card image popup
    elements.forEach(el => {
      el.addEventListener('click', () => {
        openPopup(popupImage)
        popupImageCard.src = card.link
        popupImageCard.alt = card.name
        popupImageCaption.textContent = card.name
      })
    })
  })
}
renderCard(initialCards, elementsGrid)

// User cards - every time create button clicked, new card rendered with info from input fields
btnCreate.addEventListener('click', (e) => {
  e.preventDefault()
  const userCard = [
    {
      name: cardNameInputField.value,
      link: cardLinkInputField.value
    }
  ]
  renderCard(userCard, elementsGrid)
  closePopup(popupAdd)
})



