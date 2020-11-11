import {createStore} from '../createStore';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1};
  }
  return state;
};

describe('createStore', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  test('return object as state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('change state if actions exists', () => {
    store.dispatch({type: 'ADD'});
    expect(store.getState().count).toBe(1);
  });

  test('do not change state if actions not exists', () => {
    store.dispatch({type: 'AAA'});
    expect(store.getState().count).toBe(0);
  });

  test('call subscriber fn', () => {
    store.subscribe(handler);
    store.dispatch({type: 'ADD'});
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('do not call sub if unsubscribe', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({type: 'ADD'});
    expect(handler).not.toHaveBeenCalled();
  });

  test('dispatch in async', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'});
      }, 1000);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 2000);
    });
  });
});
