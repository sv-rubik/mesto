class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector))
    this._button = this._form.querySelector(this._submitButtonSelector)
  }

  // visibility for error text & red line
  _showError(input) {
    const errorPlaceHolder = this._form.querySelector(`#${input.id}-error`)
    errorPlaceHolder.textContent = input.validationMessage
    errorPlaceHolder.classList.add(this._errorClass)
    input.classList.add(this._inputErrorClass)
  }

  // remove error visibility & red line
  _hideError(input) {
    const errorPlaceHolder = this._form.querySelector(`#${input.id}-error`)
    errorPlaceHolder.classList.remove(this._errorClass)
    input.classList.remove(this._inputErrorClass)
  }

  // input validity check
  _isInputValid(input) {
    !input.validity.valid ? this._showError(input) : this._hideError(input)
  }

  // submit button state toggle
  switchSaveBtnState() {
    if (this._form.checkValidity()) {
      this._button.classList.remove(this._inactiveButtonClass)
      this._button.disabled = false
    } else {
      this._button.classList.add(this._inactiveButtonClass)
      this._button.disabled = true
    }
  }

  // call validation & btn toggle for each input
  _addEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isInputValid(input)
        this.switchSaveBtnState(this._button)
      })
    })
  }

  // function to reset form errors for next opening
  resetError() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector))
    inputs.forEach((input) => {
      this._hideError(input)
    })
  }

  // function to perform validation
  enableValidation() {
    this._addEventListeners()
  }
}

export { FormValidator }