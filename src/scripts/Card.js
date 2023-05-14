class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._title = cardData.name
    this._link = cardData.link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._element = this._getTemplate()
    this._btnTrash = this._element.querySelector('.element__trash')
    this._btnLike = this._element.querySelector('.element__like')
    this._image = this._element.querySelector('.element__image')
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true)
  }

  _likeCard = (e) => {
    e.target.classList.toggle('element__like_active')
  }

  _deleteCard(e) {
    const element = e.target.closest('.element')
    element.remove()
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', (e) => this._likeCard(e))
    this._btnTrash.addEventListener('click', (e) => this._deleteCard(e))
    this._image.addEventListener('click', () => this._handleCardClick(this._title, this._link))
  }

// public method for card creation
  createCard() {
    this._image.src = this._link
    this._image.alt = this._title
    this._element.querySelector('.element__title').textContent = this._title
    this._setEventListeners()
    return this._element
  }
}

export { Card }