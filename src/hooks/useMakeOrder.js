import BASE_URL from '@/helpers/baseUrl';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default function () {
  const makingOrder = ref(false);
  const errorOrder = ref('');
  const errorForm = ref({});
  const deliveries = ref({});
  const payments = ref({});
  const store = useStore();
  const router = useRouter();

  const delivery = async () => {
    makingOrder.value = true;
    errorOrder.value = '';
    try {
      const { data } = await axios.get(BASE_URL + '/api/deliveries');
      deliveries.value = data;
    } catch (error) {
      errorOrder.value = error;
    } finally {
      makingOrder.value = false;
    }
  };

  const payment = async (deliveryTypeId) => {
    makingOrder.value = true;
    errorOrder.value = '';

    try {
      const { data } = await axios.get(BASE_URL + '/api/payments', {
        params: {
          deliveryTypeId,
        },
      });
      payments.value = data;
    } catch (error) {
      errorOrder.value = error;
    } finally {
      makingOrder.value = false;
    }
  };

  const makeOrder = async (formData) => {
    makingOrder.value = true;
    errorOrder.value = '';

    try {
      const { data } = await axios.post(
        BASE_URL + '/api/orders',
        {
          ...formData,
        },
        {
          params: {
            userAccessKey: store.state.userAccessKey,
          },
        }
      );
      store.commit('basket/resetBasket');
      store.commit('order/updateOrderInfo', data);
      errorForm.value = {};
      router.push({
        name: 'orderInfo',
        params: { id: data.id },
      });
    } catch (error) {
      errorForm.value = error.response.data.error.request || {};
      errorOrder.value = error.response.data.error.message;
    } finally {
      makingOrder.value = false;
    }
  };

  return {
    makingOrder,
    errorOrder,
    makeOrder,
    delivery,
    deliveries,
    payments,
    payment,
    errorForm,
  };
}
