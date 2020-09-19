import {SpreadsheetComponent} from '@core/SpreadsheetComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/DOM';

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
    if (event.target.dataset.resize) {
      const $resizeNode = $(event.target);
      const $parent = $resizeNode.closest('[data-type="resizable"]');
      const coordinates = $parent.getCoordinates();
      const type = $resizeNode.dataset.resize;
      const cells = this.$root
          .findAll(`[data-column="${$parent.dataset.column}"]`);

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coordinates.right;
          const newWidth = (coordinates.width + delta) + 'px';
          $parent.css({width: newWidth});
          cells.forEach((elem) => {
            elem.style.width = newWidth;
          });
        } else {
          const delta = e.pageY - coordinates.bottom;
          $parent.css({height: (coordinates.height + delta) + 'px'});
        }
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
      };
    }
  }
}
