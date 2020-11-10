import {SpreadsheetComponent} from '@core/SpreadsheetComponent';
import {changeTitle} from '@/store/actions';
import {$} from '@core/DOM';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends SpreadsheetComponent {
  static className = 'main__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().tableName || defaultTitle;
    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="exit">
          <span class="material-icons" data-button="exit">
              exit_to_app
          </span>
        </div>
        <div class="button" data-button="remove">
          <span class="material-icons" data-button="remove">
              delete
          </span>
        </div>
      </div>
    `;
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.dataset.button === 'remove') {
      const warning = confirm('Удалить таблицу?');

      if (warning) {
        localStorage.removeItem('spreadsheet:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.dataset.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
