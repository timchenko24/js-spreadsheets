import {Router} from '../routes/Router';
import {Page} from '../Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}

class SpreadsheetPage extends Page {

}


describe('Router', () => {
  let router;
  let $root;

  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: DashboardPage,
      spreadsheet: SpreadsheetPage,
    });
  });

  test('defined', () => {
    expect(router).toBeDefined();
  });

  test('render DashboardPage', () => {
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div>dashboard</div>');
  });
});
