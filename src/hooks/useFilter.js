import axios from 'axios';
import BASE_URL from '@/helpers/baseUrl';
import { ref } from 'vue';

export default function () {
  const category = ref(null);
  const material = ref(null);
  const season = ref(null);
  const colors = ref(null);

  const loadCategory = async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/api/productCategories');
      category.value = data.items;
    } catch (error) {
      console.log(error);
    }
  };

  const loadSeasons = async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/api/seasons');
      season.value = data.items;
    } catch (error) {
      console.log(error);
    }
  };

  const loadMaterials = async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/api/materials');
      material.value = data.items;
    } catch (error) {
      console.log(error);
    }
  };

  const loadColors = async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/api/colors');
      colors.value = data.items;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loadCategory,
    loadSeasons,
    loadMaterials,
    loadColors,
    category,
    material,
    season,
    colors,
  };
}
