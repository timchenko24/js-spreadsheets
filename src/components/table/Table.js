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
      const sideProp = type === 'col' ? 'bottom' : 'right';
      $resizeNode.css({
        opacity: 1,
        [sideProp]: '-5000px',
      });
      let value;
      const cells = this.$root
          .findAll(`[data-column="${$parent.dataset.column}"]`);

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coordinates.right;
          value = coordinates.width + delta;
          $resizeNode.css({right: -delta + 'px'});
        } else {
          const delta = e.pageY - coordinates.bottom;
          value = coordinates.height + delta;
          $resizeNode.css({bottom: -delta + 'px'});
        }
      };

      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
          $parent.css({width: value + 'px'});
          cells.forEach((elem) => {
            elem.style.width = value + 'px';
          });
        } else {
          $parent.css({height: value + 'px'});
        }

        $resizeNode.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        });
      };
    }
  }
}
