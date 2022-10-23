import BASE_URL from '@/helpers/baseUrl';
import axios from 'axios';
import formatNumber from '@/helpers/formatNumber';

export const basketModule = {
  state: () => ({
    basketProductData: [],
  }),
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
  },
  mutations: {
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

    resetBasket(state) {
      state.basketProductData = [];
    },
  },
  actions: {
    async loadBasketData(context) {
      context.rootState.loadingBasketData = true;
      context.rootState.errorBasketData = false;
      try {
        const { data } = await axios.get(BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.rootState.userAccessKey,
          },
        });
        if (!context.rootState.userAccessKey) {
          localStorage.setItem('userAccessKey', data.user.accessKey);
          context.commit('updateUserAccessKey', data.user.accessKey, {
            root: true,
          });
        }
        context.commit('updateBasketProductData', data.items);
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
    async addProductToBasket(
      context,
      { productId, colorId, sizeId, quantity }
    ) {
      context.rootState.loadingBasketData = true;
      context.rootState.errorBasketData = false;
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
              userAccessKey: context.rootState.userAccessKey,
            },
          }
        );
        context.commit('updateBasketProductData', data.items);
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
    async updateQuantityProductInBasket(context, { basketItemId, quantity }) {
      context.commit('updateProductAmout', { basketItemId, quantity });
      if (quantity < 1) return;

      context.rootState.errorBasketData = false;
      try {
        const { data } = await axios.put(
          BASE_URL + '/api/baskets/products',
          {
            basketItemId,
            quantity,
          },
          {
            params: {
              userAccessKey: context.rootState.userAccessKey,
            },
          }
        );
        context.commit('updateBasketProductData', data.items);
      } catch (error) {
        context.rootState.errorBasketData = true;
        context.commit(
          'updateErrorMessage',
          error.response.data.error.request,
          {
            root: true,
          }
        );
      }
    },
    async deleteProduct(context, basketItemId) {
      context.rootState.errorBasketData = false;
      context.commit('updateErrorMessage', '', {
        root: true,
      });
      try {
        const { data } = await axios.delete(
          BASE_URL + '/api/baskets/products',
          {
            params: {
              userAccessKey: context.rootState.userAccessKey,
            },
            data: { basketItemId },
          }
        );
        context.commit('updateBasketProductData', data.items);
      } catch (error) {
        context.rootState.errorBasketData = true;
        context.commit(
          'updateErrorMessage',
          error.response.data.error.request,
          {
            root: true,
          }
        );
      }
    },
  },
  namespaced: true,
};
