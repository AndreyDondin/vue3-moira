<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'basket' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderDetail.basket.id }}</span>
      </h1>
    </div>
    <FetchLoading v-if="$store.state.loadingBasketData" />
    <FetchError
      v-else-if="$store.state.errorBasketData"
      :message="$store.state.errorMessage"
      :buttonAction="loadInfo"
    />
    <section v-else-if="orderDetail" class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ orderDetail.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ orderDetail.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ orderDetail.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ orderDetail.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value">
                {{ orderDetail.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              class="cart__order"
              v-for="item in orderDetail.basket.items"
              :key="item.id"
            >
              <h3>{{ item.product.title }}</h3>
              <b>{{ formatNumber(item.product.price) }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b v-if="orderDetail.deliveryType.id === 1">бесплатно</b
              ><b v-else
                >{{ formatNumber(orderDetail.deliveryType.price) }} ₽</b
              >
            </p>
            <p>
              Итого: <b>{{ orderDetail.basket.items.length }}</b> товара на
              сумму
              <b
                >{{
                  formatNumber(
                    orderDetail.totalPrice +
                      Number(orderDetail.deliveryType.price)
                  )
                }}
                ₽</b
              >
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { computed, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import formatNumber from '@/helpers/formatNumber';
import FetchLoading from '@/components/FetchLoading.vue';
import FetchError from '@/components/FetchError.vue';

export default defineComponent({
  components: { FetchLoading, FetchError },
  setup() {
    const store = useStore();
    const route = useRoute();
    const orderDetail = computed(() => store.getters.getOrderInfo);
    const loadInfo = () => {
      store.dispatch('loadOrderInfo', route.params.id);
    };
    watch(
      () => route.fullPath,
      () => {
        loadInfo();
      },
      { immediate: true }
    );
    return { orderDetail, formatNumber, loadInfo };
  },
});
</script>
