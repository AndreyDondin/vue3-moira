<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.color.gallery[0].file.url"
        width="120"
        height="120"
        srcset="img/product-square-4@2x.jpg 2x"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ 'background-color': item.color.color.code }"></i>
        {{ formatColor }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click.prevent="decrement"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="quantity" name="count" />

      <button
        type="button"
        aria-label="Добавить один товар"
        @click.prevent="increment"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ item.pricePretty }}</b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct()"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import formatColorTitle from '@/helpers/formatColorTitle';

export default defineComponent({
  props: ['item'],
  setup(props) {
    const store = useStore();
    const quantity = computed({
      get() {
        return props.item.quantity;
      },
      set(value) {
        store.dispatch('basket/updateQuantityProductInBasket', {
          basketItemId: props.item.id,
          quantity: value,
        });
      },
    });

    const formatColor = formatColorTitle(props.item.color.color.title);

    const deleteProduct = () => {
      store.dispatch('basket/deleteProduct', props.item.id);
    };

    const increment = () => {
      quantity.value += 1;
    };

    const decrement = () => {
      if (quantity.value === 1) return;
      quantity.value -= 1;
    };

    return {
      quantity,
      increment,
      decrement,
      deleteProduct,
      formatColor,
    };
  },
});
</script>
