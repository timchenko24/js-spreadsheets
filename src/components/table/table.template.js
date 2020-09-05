const charCodes = {
  A: 65,
  Z: 90,
};

function createCell(value) {
  return `
    <div class="cell" contenteditable>${value}</div>
  `;
}

function createCol(value) {
  return `
    <div class='column'>${value}</div>
  `;
}

function createRow(content, number = '') {
  return `
    <div class='row'>
        <div class="row-info">${number}</div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

export function createTable(rowCount = 10) {
  const colCount = charCodes.Z - charCodes.A + 1;
  const rows = [];
  const cols = new Array(colCount)
      .fill('')
      .map((elem, key) => {
        return String.fromCharCode(charCodes.A + key);
      })
      .map((elem) => {
        return createCol(elem);
      })
      .join('');
  const cells = new Array(colCount)
      .fill('')
      .map((elem) => {
        return createCell('');
      })
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
