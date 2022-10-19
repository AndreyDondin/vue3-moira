<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="imgSrc" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.pricePretty }} </span>

    <ProductColors
      v-model:product-color="productColor"
      :colors="product.colors"
      :changeColor="changeColor"
    />

    <button
      class="item__button-catalog button button--primery"
      type="submit"
      :disabled="productAddeding || productAdded"
      @click.prevent="addProduct"
    >
      <FetchSpinner v-show="productAddeding" />
      <span v-show="productAdded">Товар успешно добавлен</span>
      <span v-show="!productAdded && !productAddeding">В корзину</span>
    </button>
  </li>
</template>

<script>
import ProductColors from '@/components/ProductColors.vue';
import FetchSpinner from '@/components/FetchSpinner.vue';
import { defineComponent, onMounted, ref } from 'vue';
import useAddProductToBasket from '@/hooks/useAddProductToBasket';
import useProductDetail from '@/hooks/useProductDetail';

export default defineComponent({
  props: ['product'],
  components: { ProductColors, FetchSpinner },
  setup(props) {
    const imgSrc = ref(props.product.colors[0].gallery[0].file.url);

    const changeColor = (index) => {
      imgSrc.value = props.product.colors[index].gallery[0].file.url;
      return imgSrc.value;
    };
    const { productData, fetchProductDetail } = useProductDetail();

    const addProduct = () => {
      addToBasket();
      setTimeout(() => {
        productAdded.value = false;
      }, 5000);
    };

    const {
      productAddeding,
      productAdded,
      addToBasket,
      productColor,
      productSize,
    } = useAddProductToBasket(productData);

    onMounted(async () => {
      await fetchProductDetail(props.product.id);
      productSize.value = productData.value.sizes[0].id;
      productColor.value = productData.value.colors[0].color.id;
    });

    return {
      imgSrc,
      changeColor,
      productAddeding,
      productAdded,
      addToBasket,
      productColor,
      addProduct,
    };
  },
});
</script>
