import {SpreadsheetComponent} from '@core/SpreadsheetComponent';
import {$} from '@core/DOM';

export class Formula extends SpreadsheetComponent {
  static className = 'main__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula component',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  add() {
    super.add();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.dataset.value);
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const {key} = event;
    const keys = ['Enter', 'Tab'];

    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:complete');
    }
  }
}
