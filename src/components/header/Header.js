import {SpreadsheetComponent} from '@core/SpreadsheetComponent';

export class Header extends SpreadsheetComponent {
  static className = 'main__header'

  toHTML() {
    return `
      <input type="text" class="input" value="New Table" />
      <div>
          <div class="button">
                  <span class="material-icons">
                      exit_to_app
                  </span>
          </div>
          <div class="button">
                  <span class="material-icons">
                      delete
                  </span>
          </div>
      </div>
    `;
  }
}
