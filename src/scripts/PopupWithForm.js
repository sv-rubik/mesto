import { Popup } from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'))
  }

// Edit Form Handler - saving new values from input
  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }
}
