import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/DOM';
import {SpreadsheetStateComponent} from '@core/SpreadsheetStateComponent';

export class Toolbar extends SpreadsheetStateComponent {
  static className = 'main__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar component',
      listeners: ['click'],
      ...options,
    });
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    };
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value);
      const key = Object.keys(value)[0];
      this.setState({[key]: value[key]});
      console.log(this.state);
    }
  }
}
