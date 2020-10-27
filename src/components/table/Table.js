import {SpreadsheetComponent} from '@core/SpreadsheetComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, isResize, matrix, nextSelector}
  from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/DOM';

export class Table extends SpreadsheetComponent {
  static className = 'main__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click'],
      ...options,
    });
  }

  toHTML() {
    return createTable();
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
    });

    this.$on('formula:complete', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (isResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const $cells = matrix(target, current).map((id) => this.$root
            .find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
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
      this.selection.select($next);

      this.$emit('table:select', $next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }

  onClick(event) {
    this.$emit('table:select', $(event.target));
  }
}
