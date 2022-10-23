<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ pagination.total }} товаров </span>
      </div>
    </div>

    <div class="content__catalog">
      <FilterProducts
        v-model:page="filterSetting.page"
        v-model:product-count-for-page="filterSetting.productCountForPage"
        v-model:price-from="filterSetting.priceFrom"
        v-model:price-to="filterSetting.priceTo"
        v-model:category-id="filterSetting.categoryId"
        v-model:material-id="filterSetting.materialId"
        v-model:season-id="filterSetting.seasonId"
        v-model:colors-id="filterSetting.colorsId"
      />

      <section class="catalog">
        <FetchLoading v-if="fetchStatus.isLoading" />
        <FetchError
          v-else-if="fetchStatus.isFailed"
          :message="errorMessage"
          :buttonAction="fetchProducts"
        />
        <ProductList :products="products" />

        <PaginationComponent
          :pages="pagination.pages"
          v-model="filterSetting.page"
        />
      </section>
    </div>
  </main>
</template>
<script>
import FilterProducts from '@/components/FilterProducts.vue';
import ProductList from '@/components/ProductList.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import { reactive, watch, defineComponent } from 'vue';
import useProducts from '@/hooks/useProducts';
import FetchLoading from '@/components/FetchLoading.vue';
import FetchError from '../components/FetchError.vue';

export default defineComponent({
  components: {
    FilterProducts,
    ProductList,
    PaginationComponent,
    FetchLoading,
    FetchError,
  },
  setup() {
    const filterSetting = reactive({
      page: 1,
      productCountForPage: 4,
      priceFrom: null,
      priceTo: null,
      categoryId: 0,
      materialId: [],
      seasonId: [],
      colorsId: [],
    });

    const { products, fetchProducts, errorMessage, fetchStatus, pagination } =
      useProducts();

    watch(
      filterSetting,
      () => {
        fetchProducts(
          filterSetting.page,
          filterSetting.productCountForPage,
          filterSetting.categoryId,
          filterSetting.materialId,
          filterSetting.seasonId,
          filterSetting.priceFrom,
          filterSetting.priceTo,
          filterSetting.colorsId
        );
      },
      { immediate: true }
    );

    return {
      products,
      errorMessage,
      fetchProducts,
      fetchStatus,
      pagination,

      filterSetting,
    };
  },
});
</script>
