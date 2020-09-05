import {$} from '@core/DOM';

export class Spreadsheet {
  constructor(selector, options) {
    this.$el = $(selector); // $el - DOM instance
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'main');
    // transform components to array of components instances
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      // create instance of every component with root element $el
      const component = new Component($el);
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
}
