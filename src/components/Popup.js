//Class to open & close popups
class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._popup = document.querySelector(this._popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

// Popups closing by Esc
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close()
    }
  }

// Popups closing by click on overlay
  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
        this.close()
      }
    })
  }
}

export { Popup }
