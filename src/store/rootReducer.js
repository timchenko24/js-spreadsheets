import {TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
  let previousState;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      previousState = state[field] || {};
      previousState[action.data.id] = action.data.value;
      return {...state, [field]: previousState};
    default: return state;
  }
}
