<template>
  <aside class="filter">
    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submitFilters"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="filter.minPrice"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="filter.maxPrice"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            name="category"
            v-model.number="filter.category"
          >
            <option value="0">Все категории</option>
            <option :value="item.id" v-for="item in category" :key="item.id">
              {{ item.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Количество товаров на странице</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            name="category"
            v-model.number="filter.productCountForPage"
          >
            <option value="4">4</option>
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="14">14</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="item in colors" :key="item.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="checkbox"
                name="color"
                :value="item.id"
                v-model.number="filter.colors"
              />
              <span
                class="colors__value"
                :title="formatColorTitle(item.title)"
                :style="{ 'background-color': item.code }"
              >
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="item in material" :key="item.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="item.id"
                v-model.number="filter.material"
              />
              <span class="check-list__desc">
                {{ item.title }}
                <span>({{ item.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="item in season" :key="item.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="item.id"
                v-model.number="filter.season"
              />
              <span class="check-list__desc">
                {{ item.title }}
                <span>({{ item.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        v-show="changeFilter"
        class="filter__reset button button--second"
        type="button"
        @click.prevent="resetFilter"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
import useFilter from '@/hooks/useFilter';
import { defineComponent, reactive, ref } from 'vue';
import formatColorTitle from '@/helpers/formatColorTitle';

export default defineComponent({
  props: [
    'page',
    'productCountForPage',
    'priceFrom',
    'priceTo',
    'categoryId',
    'materialId',
    'seasonId',
    'colorsId',
  ],
  emits: [
    'update:page',
    'update:productCountForPage',
    'update:priceFrom',
    'update:priceTo',
    'update:categoryId',
    'update:materialId',
    'update:seasonId',
    'update:colorsId',
  ],
  setup(props, { emit }) {
    const filter = reactive({
      page: 1,
      productCountForPage: 4,
      minPrice: null,
      maxPrice: null,
      category: 0,
      material: [],
      season: [],
      colors: [],
    });
    const changeFilter = ref(false);

    const {
      loadCategory,
      loadSeasons,
      loadMaterials,
      loadColors,
      category,
      season,
      material,
      colors,
    } = useFilter();

    const submitFilters = () => {
      emit('update:page', filter.page);
      emit('update:productCountForPage', filter.productCountForPage);
      emit('update:priceFrom', filter.minPrice);
      emit('update:priceTo', filter.maxPrice);
      emit('update:categoryId', filter.category);
      emit('update:materialId', filter.material);
      emit('update:seasonId', filter.season);
      emit('update:colorsId', filter.colors);
      changeFilter.value = true;
    };

    const resetFilter = () => {
      filter.page = 1;
      filter.productCountForPage = 4;
      filter.minPrice = null;
      filter.maxPrice = null;
      filter.category = 0;
      filter.material = [];
      filter.season = [];
      filter.colors = [];

      emit('update:page', 1);
      emit('update:productCountForPage', 4);
      emit('update:priceFrom', null);
      emit('update:priceTo', null);
      emit('update:categoryId', 0);
      emit('update:materialId', []);
      emit('update:seasonId', []);
      emit('update:colorsId', []);
      changeFilter.value = false;
    };

    loadCategory();
    loadSeasons();
    loadMaterials();
    loadColors();

    return {
      category,
      season,
      material,
      submitFilters,
      filter,
      resetFilter,
      colors,
      changeFilter,
      formatColorTitle,
    };
  },
});
</script>
