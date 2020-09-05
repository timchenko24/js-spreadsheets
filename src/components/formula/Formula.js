import {SpreadsheetComponent} from '@core/SpreadsheetComponent';

export class Formula extends SpreadsheetComponent {
  static className = 'main__formula'

  constructor($root) {
    super($root, {
      name: 'Formula component',
      listeners: ['input'],
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(this.$root);
    console.log('f on input', event.target.textContent.trim());
  }
}
