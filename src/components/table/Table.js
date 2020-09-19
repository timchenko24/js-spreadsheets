import {SpreadsheetComponent} from '@core/SpreadsheetComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isResize} from '@/components/table/table.functions';

export class Table extends SpreadsheetComponent {
  static className = 'main__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (isResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
