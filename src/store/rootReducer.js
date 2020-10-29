import {TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
  let previousState;
  switch (action.type) {
    case TABLE_RESIZE:
      previousState = state.colState || {};
      previousState[action.data.id] = action.data.value;
      return {...state, colState: previousState};
    default: return state;
  }
}
