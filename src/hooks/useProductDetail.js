import BASE_URL from '@/helpers/baseUrl';
import axios from 'axios';
import formatNumber from '@/helpers/formatNumber';
import { ref, reactive } from 'vue';
import noImg from '../assets/no-found-img.jpg';

export default function () {
  const productData = ref(null);
  const errorMessage = ref('');
  const imgSrc = ref('');
  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });
  const fetchProductDetail = async (id) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
      productData.value = Object.assign(data, {
        pricePretty: `${formatNumber(data.price)} ₽`,
      });
      productData.value.colors.forEach((prop) => {
        if (!prop.gallery) {
          Object.defineProperty(prop, 'gallery', {
            value: [{ file: { url: noImg } }],
          });
        }
      });
      imgSrc.value = productData.value.colors[0].gallery[0].file.url;
    } catch (error) {
      fetchStatus.isFailed = true;
      errorMessage.value = error;
    } finally {
      fetchStatus.isLoading = false;
    }
  };

  const changeColor = (index) => {
    imgSrc.value = productData.value.colors[index].gallery[0].file.url;
    return imgSrc.value;
  };

  return {
    fetchProductDetail,
    fetchStatus,
    errorMessage,
    productData,
    imgSrc,
    changeColor,
  };
}
