import {SpreadsheetComponent} from '@core/SpreadsheetComponent';

export class Toolbar extends SpreadsheetComponent {
  static className = 'main__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar component',
      listeners: ['click'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="button">
        <span class="material-icons">
            format_bold
        </span>
      </div>

      <div class="button">
        <span class="material-icons">
            format_italic
        </span>
      </div>

      <div class="button">
        <span class="material-icons">
            format_align_left
        </span>
      </div>

      <div class="button">
        <span class="material-icons">
            format_align_right
        </span>
      </div>

      <div class="button">
        <span class="material-icons">
            format_align_center
        </span>
      </div>

      <div class="button">
        <span class="material-icons">
            format_align_justify
        </span>
      </div>
    `;
  }

  onClick(event) {
    console.log(event.target);
  }
}
