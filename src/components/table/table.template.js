const charCodes = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function createCell(value, col, row, width) {
  return `<div class="cell" contenteditable 
            data-column="${col}"
            data-type="cell"
            data-id="${row}:${col}"
            style="width: ${width}"
          >
            ${value}
          </div>`;
}

function createCol(value, index, width) {
  return `
    <div class='column' 
      data-type="resizable" 
      data-column="${index}" 
      style="width: ${width}"
    >
      ${value}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, number = '', height) {
  const resize = number ? '<div class="row-resize" ' +
    'data-resize="row"></div>' : '';
  return `
    <div class='row' 
      data-type="resizable" 
      data-row="${number}" 
      style="height: ${height}"
    >
      <div class="row-info">
          ${number}
          ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export function createTable(rowCount = 10, state = {}) {
  const colCount = charCodes.Z - charCodes.A + 1;
  const rows = [];
  const cols = new Array(colCount)
      .fill('')
      .map((elem, key) => {
        return String.fromCharCode(charCodes.A + key);
      })
      .map((elem, index) => {
        const width = getWidth(state.colState, index);
        return createCol(elem, index, width);
      })
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colCount)
        .fill('')
        .map((elem, col) => {
          const width = getWidth(state.colState, col);
          const data = state.dataState[`${row}:${col}`] || '';
          return createCell(data, col, row, width);
        })
        .join('');

    const height = getHeight(state.rowState, row + 1);
    rows.push(createRow(cells, row + 1, height));
  }

  return rows.join('');
}
