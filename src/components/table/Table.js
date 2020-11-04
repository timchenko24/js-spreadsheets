import {SpreadsheetComponent} from '@core/SpreadsheetComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, isResize, matrix, nextSelector}
  from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/DOM';
import * as actions from '@/store/actions';
import {defaultStyles} from '@/constants';

export class Table extends SpreadsheetComponent {
  static className = 'main__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  add() {
    super.add();

    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.$emit('table:select', $cell);
    this.selection.select($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
      this.updateTextInStore(text);
    });

    this.$on('formula:complete', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
    });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn(e.message);
    }
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);

    console.log($cell.getStyles(Object.keys(defaultStyles)));
  }

  onMousedown(event) {
    if (isResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current).map((id) => this.$root
            .find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft',
      'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);

      const $next = this.$root.find(nextSelector(key, id));

      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.cellText({
      id: this.selection.current.id(),
      value,
    }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
