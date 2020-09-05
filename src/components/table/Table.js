import {SpreadsheetComponent} from '@core/SpreadsheetComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends SpreadsheetComponent {
  static className = 'main__table'


  toHTML() {
    return createTable();
  }
}
