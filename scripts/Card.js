import { openPopup, popupImageCard, popupImageCaption } from './index.js'

class Card {
  constructor(cardData, templateSelector) {
    this._title = cardData.name
    this._link = cardData.link
    this._templateSelector = templateSelector
    this._element = this._getTemplate()
    this._btnTrash = this._element.querySelector('.element__trash')
    this._btnLike = this._element.querySelector('.element__like')
    this._image = this._element.querySelector('.element__image')
  }

  _getTemplate() {
    const templateHTML = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true)
    return templateHTML
  }

  _likeCard = (e) => {
    e.target.classList.toggle('element__like_active')
  }

  _deleteCard(e) {
    const element = e.target.closest('.element')
    element.remove()
  }

  _popupOnClick() {
    openPopup(popupImage)
    popupImageCard.src = this._link
    popupImageCard.alt = this._title
    popupImageCaption.textContent = this._title
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', (e) => this._likeCard(e))
    this._btnTrash.addEventListener('click', (e) => this._deleteCard(e))
    this._image.addEventListener('click', () => this._popupOnClick())
  }

// public method for card creation
  createCard() {
    this._element.querySelector('.element__image').src = this._link
    this._element.querySelector('.element__image').alt = this._title
    this._element.querySelector('.element__title').textContent = this._title
    this._setEventListeners()
    return this._element
  }
}

export { Card }