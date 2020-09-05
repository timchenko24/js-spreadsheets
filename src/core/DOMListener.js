import {capitalize} from '@core/utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  addDOMListeners() {
    this.listeners.forEach((listener) => {
      // transform event method name Ex. 'click' -> 'onClick'
      const method = 'on' + capitalize(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListener() {
    this.listeners.forEach((listener) => {
      const method = 'on' + capitalize(listener);
      this.$root.remove(listener, this[method]);
    });
  }
}
