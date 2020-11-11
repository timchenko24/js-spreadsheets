import {isEqual} from '@core/utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.previousState = {};
  }

  subscribeComponents(components) {
    this.previousState = this.store.getState();

    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.previousState[key], state[key])) {
          components.forEach((c) => {
            if (c.isWatching(key)) {
              const changes = {[key]: state[key]};
              c.storeChanged(changes);
            }
          });
        }
      });

      this.previousState = this.store.getState();

      if (process.env.NODE_ENV === 'development') {
        window['store'] = this.previousState;
      }
    });
  }

  unsubscribeComponent() {
    this.sub.unsubscribe();
  }
}
