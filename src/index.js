import './scss/index.scss';
import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {SpreadsheetPage} from '@/pages/SpreadsheetPage';

new Router('#app', {
  dashboard: DashboardPage,
  spreadsheet: SpreadsheetPage,
});
