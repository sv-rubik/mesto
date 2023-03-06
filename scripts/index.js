// Variables
const btnEdit = document.querySelector('.profile__edit-btn')
const btnsClose = document.querySelectorAll('.popup__close-btn')
const btnAddElement = document.querySelector('.profile__add-btn')
const popupEdit = document.getElementById('popup-edit')
const popupAdd = document.getElementById('popup-add')
const formEdit = popupEdit.querySelector('.popup__form')
const formAdd = popupAdd.querySelector('.popup__form')
const profileNameText = document.querySelector('.profile__name')
const profileDescriptionText = document.querySelector('.profile__description')
const profileNameInputField = document.getElementById('profile-name')
const profileDescriptionInputField = document.getElementById('profile-description')
const elementsGrid = document.querySelector('.elements-grid')
const cardNameInputField = document.getElementById('card-name')
const cardLinkInputField = document.getElementById('card-link')
const popupImage = document.getElementById('popup-image')
const popupImageCaption = document.querySelector('.popup__image-caption')
const popupImageCard = document.querySelector('.popup__image')

// Close popups
function closePopup(el) {
  el.classList.remove('popup_opened')
}

// Open Popups
function openPopup(el) {
  el.classList.add('popup_opened')
}

// Edit Form Handler - saving new values from input
function handleEditFormSubmitBtn (evt) {
  evt.preventDefault()
  profileNameText.textContent = profileNameInputField.value
  profileDescriptionText.textContent = profileDescriptionInputField.value
  closePopup(popupEdit)
}

// Add Form Handler - User cards rendered with info from input fields
function handleAddFormSubmitBtn (evt) {
  evt.preventDefault()
  const userCard = {
    name: cardNameInputField.value,
    link: cardLinkInputField.value
  }
  addCardToContainer(userCard, elementsGrid)
  closePopup(popupAdd)
  document.getElementById('new-cards').reset()
}

// Adding rendered cards to ul container
function addCardToContainer(card, container) {
  const cardElement = renderCard(card)
  container.prepend(cardElement)
}

//Render any card from JS to HTML with deletion, likes and image popup
function renderCard(card) {
  const template = document.querySelector('#card-template').content
  const newElement = template.cloneNode(true)
  const image = newElement.querySelector('.element__image')
  const title = newElement.querySelector('.element__title')
  const btnTrash = newElement.querySelector('.element__trash')
  const btnLike = newElement.querySelector('.element__like')
  image.src = card.link
  image.alt = card.name
  title.textContent = card.name
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
  image.addEventListener('click', () => {
    openPopup(popupImage)
    popupImageCard.src = card.link
    popupImageCard.alt = card.name
    popupImageCaption.textContent = card.name
  })
  return newElement
}

// Event listeners
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit)
  profileNameInputField.value = profileNameText.textContent
  profileDescriptionInputField.value = profileDescriptionText.textContent
})
btnAddElement.addEventListener('click', () => openPopup(popupAdd))
btnsClose.forEach(btn => {
  btn.addEventListener('click', () => {
    const popup = btn.closest('.popup')
    closePopup(popup)
  })
})
formEdit.addEventListener('submit', handleEditFormSubmitBtn)
formAdd.addEventListener('submit', handleAddFormSubmitBtn)

// Render initial cards
initialCards.forEach(card => {
  addCardToContainer(card, elementsGrid)
})






