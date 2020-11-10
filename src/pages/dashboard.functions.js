import {storage} from '@core/utils';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  const date = new Date(parseInt(key.toString().split(':')[1]));
  return `
    <li class="db__record">
      <a href="#spreadsheet/${id}">${model.tableName}</a>
      <strong>${date.toLocaleDateString()}</strong>
    </li>
  `;
}

export function getAllKeys() {
  const keys = [];
  for (let i=0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('spreadsheet')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createTablesDashboard() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Созданных таблиц не найдено</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    
    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
