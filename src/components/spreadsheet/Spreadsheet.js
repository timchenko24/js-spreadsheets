import {$} from '@core/DOM';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDate} from '@/store/actions';
import {preventDefault} from '@core/utils';

export class Spreadsheet {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'main');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
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

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.add());
  }

  destroy() {
    this.subscriber.unsubscribeComponent();
    this.components.forEach((component) => component.destroy());
    document.removeEventListener('contextmenu', preventDefault);
  }
}
