//Class Section to render elements on the page - receives html from renderer callback func & can insert it to container
export default class Section {
  // items - is an array with data
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer
    this._templateContainer = document.querySelector(containerSelector)
  }

  // to render all elements (each one with renderer)
  renderItems(res) {
    res.forEach(this._renderer)
  }

  // to get DOM el-t and add it to container
  addItem(element) {
    this._templateContainer.prepend(element)
  }
}

