import {$} from '@core/DOM';
import {Emitter} from '@core/Emitter';

export class Spreadsheet {
  constructor(selector, options) {
    this.$el = $(selector); // $el - DOM instance
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'main');
    const componentOptions = {
      emitter: this.emitter,
    };
    // transform components to array of components instances
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      // create instance of every component with root element $el
      const component = new Component($el, componentOptions);
      // inserts component html to $el
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    // return DOM instance $root with all DOM instances of components
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.add());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
