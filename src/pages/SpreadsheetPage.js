import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/store/rootReducer';
import {normalizeInitialState} from '@/store/initialState';
import {Spreadsheet} from '@/components/spreadsheet/Spreadsheet';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {StateProcessor} from '@core/StateProcessor';
import {LocalStorageClient} from '@core/clients/LocalStorageClient';

export class SpreadsheetPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params)
    );
  }

  async getRoot() {
    const state = await this.processor.get();
    const store = createStore(rootReducer, normalizeInitialState(state));

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
