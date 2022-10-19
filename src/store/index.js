import BASE_URL from '@/helpers/baseUrl';
import axios from 'axios';
import { createStore } from 'vuex';
import formatNumber from '@/helpers/formatNumber';

export default createStore({
  state: {
    userAccessKey: null,
    loadingBasketData: false,
    errorBasketData: false,
    errorMessage: null,
    basketProductData: [],
    orderInfo: null,
  },
  getters: {
    getBasketProductData(state) {
      return state.basketProductData.map((prod) => ({
        ...prod,
        pricePretty: `${formatNumber(prod.price * prod.quantity)} ₽`,
      }));
    },

    getTotalPrice(state) {
      const sum = state.basketProductData.reduce(
        (acc, prod) => prod.quantity * prod.price + acc,
        0
      );
      const prettySum = `${formatNumber(sum)} ₽`;
      return { sum, prettySum };
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
    getOrderInfo(state) {
      return state.orderInfo;
    },
  },
  mutations: {
    updateUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    updateErrorMessage(state, message) {
      state.errorMessage = message;
    },
    updateProductAmout(state, { basketItemId, amount }) {
      const product = state.basketProductData.find(
        (prod) => prod.id === basketItemId
      );
      if (product) {
        product.amount = amount;
      }
    },
    updateBasketProductData(state, productData) {
      state.basketProductData = productData;
    },
    updateOrderInfo(state, order) {
      state.orderInfo = order;
    },
    resetBasket(state) {
      state.basketProductData = [];
    },
  },
  actions: {
    async loadBasketData(context) {
      context.state.loadingBasketData = true;
      context.state.errorBasketData = false;
      try {
        const { data } = await axios.get(BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', data.user.accessKey);
          context.commit('updateUserAccessKey', data.user.accessKey);
        }
        context.commit('updateBasketProductData', data.items);
      } catch (error) {
        context.state.errorBasketData = true;
        context.commit('updateErrorMessage', error.response.data.error.request);
      } finally {
        context.state.loadingBasketData = false;
      }
    },
    async addProductToBasket(
      context,
      { productId, colorId, sizeId, quantity }
    ) {
      context.state.loadingBasketData = true;
      context.state.errorBasketData = false;
      try {
        const { data } = await axios.post(
          BASE_URL + '/api/baskets/products',
          {
            productId,
            colorId,
            sizeId,
            quantity,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        );

        context.commit('updateBasketProductData', data.items);
      } catch (error) {
        context.state.errorBasketData = true;
        context.commit('updateErrorMessage', error.response.data.error.request);
      } finally {
        context.state.loadingBasketData = false;
      }
    },
    async updateQuantityProductInBasket(context, { basketItemId, quantity }) {
      context.commit('updateProductAmout', { basketItemId, quantity });
      if (quantity < 1) return;

      context.state.errorBasketData = false;
      try {
        const { data } = await axios.put(
          BASE_URL + '/api/baskets/products',
          {
            basketItemId,
            quantity,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        );
        context.commit('updateBasketProductData', data.items);
      } catch (error) {
        context.state.errorBasketData = true;
        context.commit('updateErrorMessage', error.response.data.error.request);
      }
    },
    async deleteProduct(context, basketItemId) {
      context.state.errorBasketData = false;
      context.commit('updateErrorMessage', '');
      try {
        const { data } = await axios.delete(
          BASE_URL + '/api/baskets/products',
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: { basketItemId },
          }
        );
        context.commit('updateBasketProductData', data.items);
      } catch (error) {
        context.state.errorBasketData = true;
        console.log(0, error);
        context.commit('updateErrorMessage', error.response.data.error.request);
        console.log(1, context.state.errorMessage.value);
      }
    },
    async loadOrderInfo(context, orderId) {
      context.state.loadingBasketData = true;
      context.state.errorBasketData = false;
      try {
        const { data } = await axios.get(BASE_URL + '/api/orders/' + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });

        context.commit('updateOrderInfo', data);
        console.log('213123123', data);
      } catch (error) {
        context.state.errorBasketData = true;
        context.commit('updateErrorMessage', error.response.data.error.request);
      } finally {
        context.state.loadingBasketData = false;
      }
    },
  },

  modules: {},
});
