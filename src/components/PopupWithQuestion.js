import { Popup } from "./Popup.js"

export default class PopupWithQuestion extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._handleFormQuestion = null
    this._formSubmit = this._popup.querySelector('.popup__form') // it's form with Submit btn
  }

  setSubmitAction(handleFormQuestion) {
    this._handleFormQuestion = handleFormQuestion
  }

  open(cardId, cardObject) {
    this._cardId = cardId
    this._cardObject = cardObject
    super.open() //get open from super
  }

  setEventListeners() {
    this._formSubmit.addEventListener('submit', (e) => {
      e.preventDefault()
      if (this._handleFormQuestion) {
        this._handleFormQuestion(this._cardId, this._cardObject)
      }
    })
    super.setEventListeners() //get other listeners from super
  }
}
