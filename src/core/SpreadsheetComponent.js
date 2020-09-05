import {DOMListener} from '@core/DOMListener';

export class SpreadsheetComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }

  toHTML() {
    return '';
  }

  add() {
    this.addDOMListeners();
  }

  destroy() {
    this.removeDOMListener();
  }
}
