import axios from 'axios';
import BASE_URL from '@/helpers/baseUrl';
import { ref, reactive } from 'vue';
import formatNumber from '@/helpers/formatNumber';
import noImg from '../assets/no-found-img.jpg';

export default function () {
  const productsData = ref(null);
  const pagination = reactive({
    page: 0,
    pages: 0,
    total: 0,
  });
  const errorMessage = ref('');
  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });
  const fetchProducts = async (
    page,
    limits,
    category,
    material,
    season,
    minPrice,
    maxPrice,
    color
  ) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    try {
      const { data } = await axios.get(BASE_URL + '/api/products', {
        params: {
          page: page,
          limit: limits,
          categoryId: category,
          materialIds: material,
          seasonIds: season,
          minPrice: minPrice,
          maxPrice: maxPrice,
          colorIds: color,
        },
      });
      pagination.page = data.pagination.page;
      pagination.pages = data.pagination.pages;
      pagination.total = data.pagination.total;
      productsData.value = data.items.map((product) => ({
        ...product,
        pricePretty: `${formatNumber(product.price)} ₽`,
      }));
      productsData.value.forEach((product) => {
        product.colors.forEach((prop) => {
          if (!prop.gallery) {
            Object.defineProperty(prop, 'gallery', {
              value: [{ file: { url: noImg } }],
            });
          }
        });
      });
    } catch (error) {
      fetchStatus.isFailed = true;
      errorMessage.value = error;
    } finally {
      fetchStatus.isLoading = false;
    }
  };
  return {
    fetchProducts,
    products: productsData,
    errorMessage,
    fetchStatus,
    pagination,
  };
}
