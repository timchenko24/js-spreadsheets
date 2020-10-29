import {storage} from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
};

export const initialState = storage('main-state') ?
  storage('main-state') : defaultState;
