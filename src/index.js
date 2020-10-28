import './scss/index.scss';
import {Spreadsheet} from '@/components/spreadsheet/Spreadsheet';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/store/rootReducer';

const store = createStore(rootReducer);

const spreadsheet = new Spreadsheet('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

spreadsheet.render();
