export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemToEnd(element) {
    this._container.append(element);
  }

  addItemToStart(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }
}
