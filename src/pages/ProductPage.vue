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
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ productData?.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ productData?.title }} </a>
        </li>
      </ul>
    </div>
    <FetchLoading v-if="fetchStatus.isLoading" />
    <FetchError
      v-else-if="fetchStatus.isFailed"
      :message="errorMessage"
      :buttonAction="fetchProducts"
    />
    <section v-else-if="productData" class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="imgSrc"
            :alt="productData.title"
          />
        </div>
        <ul class="pics__list">
          <li
            class="pics__item"
            v-for="(item, index) in productData.colors"
            :key="index"
          >
            <a
              class="pics__link"
              :class="{
                'pics__link--current': item.gallery[0].file.url === imgSrc,
              }"
            >
              <img
                class="pics__img"
                width="98"
                height="98"
                :src="item.gallery[0].file.url"
                :alt="productData.title"
                @click="changeColor(index)"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">{{ productData.title }}</h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addProduct"
          >
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button
                  type="button"
                  aria-label="Убрать один товар"
                  @click="decrementProductAmount"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input
                  type="text"
                  v-model.number="productAmount"
                  name="count"
                />

                <button
                  type="button"
                  aria-label="Добавить один товар"
                  @click="incrementProductAmount"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> {{ productData.pricePretty }} </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ProductColors
                  v-model:product-color="productColor"
                  :colors="productData.colors"
                  :changeColor="changeColor"
                />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label
                  class="form__label form__label--small form__label--select"
                >
                  <select
                    class="form__select"
                    name="category"
                    v-model="productSize"
                  >
                    <option
                      :value="item.id"
                      v-for="item in productData.sizes"
                      :key="item.id"
                      :selected="item.id === productSize"
                    >
                      {{ item.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button
              class="item__button button button--primery"
              type="submit"
              :disabled="productAddeding || productAdded"
            >
              <FetchSpinner v-show="productAddeding" />
              <span v-show="productAdded">Товар успешно добавлен</span>
              <span v-show="!productAdded && !productAddeding">В корзину</span>
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a
              class="tabs__link"
              :class="{ 'tabs__link--current': linkInfoAbout }"
              @click="changeInfoAbout"
            >
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              :class="{ 'tabs__link--current': !linkInfoAbout }"
              @click="changeInfoAbout"
            >
              Доставка и возврат
            </a>
          </li>
        </ul>

        <InfoAboutProduct v-if="linkInfoAbout" />
        <InfoAboutDelivery v-else />
      </div>
    </section>
  </main>
</template>

<script>
import ProductColors from '@/components/ProductColors.vue';
import useProductDetail from '@/hooks/useProductDetail';
import FetchLoading from '@/components/FetchLoading.vue';
import FetchError from '@/components/FetchError.vue';
import { defineComponent, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import InfoAboutProduct from '@/components/InfoAboutProduct.vue';
import InfoAboutDelivery from '@/components/InfoAboutDelivery.vue';
import FetchSpinner from '@/components/FetchSpinner.vue';
import useAddProductToBasket from '@/hooks/useAddProductToBasket';

export default defineComponent({
  components: {
    FetchLoading,
    FetchError,
    ProductColors,
    InfoAboutProduct,
    InfoAboutDelivery,
    FetchSpinner,
  },
  setup() {
    const route = useRoute();
    const linkInfoAbout = ref(true);

    const {
      fetchProductDetail,
      fetchStatus,
      errorMessage,
      productData,
      imgSrc,
      changeColor,
    } = useProductDetail();

    const {
      productAddeding,
      productAdded,
      productAmount,
      productColor,
      productSize,
      addToBasket,
      incrementProductAmount,
      decrementProductAmount,
    } = useAddProductToBasket(productData);

    const changeInfoAbout = () => {
      linkInfoAbout.value = !linkInfoAbout.value;
    };

    const addProduct = () => {
      addToBasket();
      setTimeout(() => {
        productAdded.value = false;
      }, 5000);
    };

    watch(
      () => route.fullPath,
      async () => {
        await fetchProductDetail(route.params.id);
        productColor.value = productData.value.colors[0].color.id;
        productSize.value = productData.value.sizes[0].id;
      },
      { immediate: true }
    );

    return {
      fetchStatus,
      errorMessage,
      productData,
      changeColor,
      imgSrc,
      changeInfoAbout,
      linkInfoAbout,
      addToBasket,
      productAmount,
      incrementProductAmount,
      decrementProductAmount,
      productColor,
      productSize,
      productAddeding,
      productAdded,
      addProduct,
    };
  },
});
</script>
