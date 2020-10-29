import {CELL_TEXT, TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
  let previousState;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      previousState = state[field] || {};
      previousState[action.data.id] = action.data.value;
      return {...state, [field]: previousState};
    case CELL_TEXT:
      previousState = state['dataState'] || {};
      previousState[action.data.id] = action.data.value;
      return {...state, currentText: action.data.value,
        dataState: previousState};
    default: return state;
  }
}
