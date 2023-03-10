const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

// visibility for error text & red line
function showError(input, form) {
  const errorPlaceHolder = form.querySelector(`#${input.id}-error`)
  errorPlaceHolder.textContent = input.validationMessage
  errorPlaceHolder.classList.add(settings.errorClass)
  input.classList.add(settings.inputErrorClass)
}

// remove error visibility & red line
function hideError(input, form) {
  const errorPlaceHolder = form.querySelector(`#${input.id}-error`)
  errorPlaceHolder.classList.remove(settings.errorClass)
  input.classList.remove(settings.inputErrorClass)
}

// input validity check
function isInputValid(input, form) {
  !input.validity.valid ? showError(input, form) : hideError(input, form)
}

// submit button state toggle
function switchSaveBtnState(button, form) {
  if (form.checkValidity()) {
    button.classList.remove(settings.inactiveButtonClass)
    button.disabled = false
  } else {
    button.classList.add(settings.inactiveButtonClass)
    button.disabled = true
  }
}

// define form for event listeners and call validation & btn toggle for each input
function addEventListeners(form) {
  const inputs = form.querySelectorAll(settings.inputSelector)
  const button = form.querySelector(settings.submitButtonSelector)
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isInputValid(input, form)
      switchSaveBtnState(button, form)
    })
  })
}

// function to walk through the forms
function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector)
  forms.forEach((form) => {
    addEventListeners(form)
  })
}

enableValidation(settings)