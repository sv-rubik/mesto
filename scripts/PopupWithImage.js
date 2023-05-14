import { Popup } from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = document.querySelector('.popup__image')
    this._popupCaption = document.querySelector('.popup__image-caption')
  }

  open(caption, link) {
    this._popupImage.src = link
    this._popupImage.alt = caption
    this._popupCaption.textContent = caption
    super.open()
  }
}