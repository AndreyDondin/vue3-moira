import BASE_URL from '@/helpers/baseUrl';
import axios from 'axios';

export const orderModule = {
  state: () => ({
    orderInfo: null,
  }),
  getters: {
    getOrderInfo(state) {
      return state.orderInfo;
    },
  },
  mutations: {
    updateOrderInfo(state, order) {
      state.orderInfo = order;
    },
  },
  actions: {
    async loadOrderInfo(context, orderId) {
      context.rootState.loadingBasketData = true;
      context.rootState.errorBasketData = false;
      try {
        const { data } = await axios.get(BASE_URL + '/api/orders/' + orderId, {
          params: {
            userAccessKey: context.rootState.userAccessKey,
          },
        });

        context.commit('updateOrderInfo', data);
      } catch (error) {
        context.rootState.errorBasketData = true;
        context.commit(
          'updateErrorMessage',
          error.response.data.error.request,
          {
            root: true,
          }
        );
      } finally {
        context.rootState.loadingBasketData = false;
      }
    },
  },
  namespaced: true,
};
