import {DOMListener} from '@core/DOMListener';

export class SpreadsheetComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';

    this.prepare();
  }

  prepare() {

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
