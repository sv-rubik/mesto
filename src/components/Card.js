class Card {
  constructor(cardData, userId, templateSelector, handleCardClick, handleCardDelete, handleAddingLikes, handleRemovingLikes) {
    this._cardData = cardData
    this._title = cardData.name
    this._link = cardData.link
    this._userID = userId
    this._cardID = cardData._id
    this._ownerID = cardData.owner._id
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._addLike = handleAddingLikes
    this._removeLike = handleRemovingLikes
    this._element = this._getTemplate()
    this._btnTrash = this._element.querySelector('.element__trash')
    this._btnLike = this._element.querySelector('.element__like')
    this._image = this._element.querySelector('.element__image')
    this.likeSelector = this._element.querySelector('.element__likes-counter')
  }

  deleteCard = () => {
    this._element.remove()
    this._element = null
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => this._toggleLikes())
    this._image.addEventListener('click', () => this._handleCardClick(this._title, this._link))
    if (this._userID === this._ownerID) {
      this._btnTrash.addEventListener('click', () => this._handleCardDelete(this, this._cardID))
    } else {
      this._btnTrash.remove()
    }
  }

// public method for card creation
  createCard() {
    this._image.src = this._link
    this._image.alt = this._title
    this._element.querySelector('.element__title').textContent = this._title
    this.showNumberOfLikes(this._cardData)
    this._setEventListeners()
    return this._element
  }

////////////////////////////////////////////// Likes realization
  showNumberOfLikes(cardData) {
    this._likesArray = cardData.likes
    if (this._likesArray.length === 0) {
      this.likeSelector.textContent = '0'
    } else {
      this.likeSelector.textContent = this._likesArray.length
    }
    if (this._isLiked()) {
      this._btnLike.classList.add('element__like_active')
    } else {
      this._btnLike.classList.remove('element__like_active')
    }
  }

  //check if card was liked
  _isLiked() {
    return this._likesArray.find((userLike) => userLike._id === this._userID)
  }

  // to add or remove likes
  _toggleLikes() {
    this._isLiked() ? this._removeLike(this._cardID) : this._addLike(this._cardID)
  }
}

export { Card }