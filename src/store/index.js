import { createStore } from 'vuex';
import { basketModule } from './basketModule';
import { orderModule } from './orderModule';

export default createStore({
  state: {
    userAccessKey: null,
    loadingBasketData: false,
    errorBasketData: false,
    errorMessage: null,
  },
  getters: {
    getErrorMessage(state) {
      return state.errorMessage;
    },
  },
  mutations: {
    updateUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    updateErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {},

  modules: {
    basket: basketModule,
    order: orderModule,
  },
});
