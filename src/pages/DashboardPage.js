import {Page} from '@core/Page';
import {$} from '@core/DOM';
import {createTablesDashboard} from '@/pages/dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Dashboard</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#spreadsheet/${now}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>

      <div class="db__table db__view">

        ${ createTablesDashboard() }

      </div>
    `);
  }
}
