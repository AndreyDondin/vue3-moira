<template>
  <FetchSpinner v-if="$store.state.loadingBasketData" />
  <router-link
    v-else
    class="header__cart"
    :to="{ name: 'basket' }"
    aria-label="Корзина с товарами"
  >
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{
      $store.getters.getBasketProductData.length
    }}</span>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue';
import FetchSpinner from './FetchSpinner.vue';

export default defineComponent({
  components: { FetchSpinner },
  setup() {},
});
</script>
