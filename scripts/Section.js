//Class Section to render elements on the page - receives html from renderer callback func & can insert it to container
export default class Section {
  // items - is an array with data
  constructor({ initialCards, renderer }, containerSelector) {
    this._renderedItems = initialCards
    this._renderer = renderer
    this._templateContainer = document.querySelector(containerSelector)
  }
  // to render all elements (each one with renderer)
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  // to get DOM el-t and add it to container
  addItem(element) {
    this._templateContainer.prepend(element)
  }
}