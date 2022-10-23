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
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ basketData.length }} товара </span>
      </div>
    </div>
    <FetchLoading v-if="$store.state.loadingBasketData" />
    <FetchError
      v-else-if="$store.state.errorBasketData"
      :message="$store.state.errorMessage"
      :buttonAction="loadBasketData"
    />
    <section v-else class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <BasketProduct
              v-for="item in basketData"
              :key="item.id"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice.prettySum }}</span>
          </p>
          <router-link custom v-slot="{ navigate }" :to="{ name: 'order' }">
            <button
              class="cart__button button button--primery"
              type="submit"
              @click="navigate"
            >
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import FetchLoading from '@/components/FetchLoading.vue';
import FetchError from '@/components/FetchError.vue';
import BasketProduct from '@/components/BasketProduct.vue';

export default defineComponent({
  components: { FetchLoading, FetchError, BasketProduct },
  setup() {
    const store = useStore();
    const loadBasketData = () => {
      store.dispatch('loadBasketData');
    };
    const basketData = computed(
      () => store.getters['basket/getBasketProductData']
    );
    const totalPrice = computed(() => store.getters['basket/getTotalPrice']);

    return {
      basketData,
      loadBasketData,
      totalPrice,
    };
  },
});
</script>
