import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/store/rootReducer';
import {initialState} from '@/store/initialState';
import {debounce, storage} from '@core/utils';
import {Spreadsheet} from '@/components/spreadsheet/Spreadsheet';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

export class SpreadsheetPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce((state) => {
      console.log(state);
      storage('main-state', state);
    }, 300);

    store.subscribe(stateListener);

    this.spreadsheet = new Spreadsheet({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.spreadsheet.getRoot();
  }

  afterRender() {
    this.spreadsheet.init();
  }

  destroy() {
    this.spreadsheet.destroy();
  }
}
