const charCodes = {
  A: 65,
  Z: 90,
};

function createCell(value, index) {
  return `
    <div class="cell" contenteditable data-column="${index}">${value}</div>
  `;
}

function createCol(value, index) {
  return `
    <div class='column' data-type="resizable" data-column="${index}">
        ${value}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, number = '') {
  const resize = number ? '<div class="row-resize" ' +
    'data-resize="row"></div>' : '';
  return `
    <div class='row' data-type="resizable">
        <div class="row-info">
            ${number}
            ${resize}
        </div>
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
      .map((elem, index) => {
        return createCol(elem, index);
      })
      .join('');
  const cells = new Array(colCount)
      .fill('')
      .map((elem, index) => {
        return createCell('', index);
      })
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
