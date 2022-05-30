export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemToEnd(element) {
    this._container.append(element);
  }

  addItemToStart(element) {
    this._container.prepend(element);
  }

  renderItems(arr) {
    arr.forEach((item) => {
      this._renderer(item);
    })
  }
}
