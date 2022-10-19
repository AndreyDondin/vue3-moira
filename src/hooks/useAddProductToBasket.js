import { ref } from 'vue';
import { useStore } from 'vuex';

export default function (productData) {
  const productAddeding = ref(false);
  const productAdded = ref(false);
  const productAmount = ref(1);
  const productColor = ref(0);
  const productSize = ref(null);
  const store = useStore();

  const incrementProductAmount = () => {
    productAmount.value += 1;
  };
  const decrementProductAmount = () => {
    if (productAmount.value === 1) return;
    productAmount.value -= 1;
  };

  const addToBasket = async () => {
    productAddeding.value = true;
    productAdded.value = false;
    await store.dispatch('addProductToBasket', {
      productId: productData.value.id,
      colorId: productColor.value,
      sizeId: productSize.value,
      quantity: productAmount.value,
    });
    productAdded.value = true;
    productAddeding.value = false;
  };

  return {
    productAddeding,
    productAdded,
    productAmount,
    productColor,
    productSize,
    addToBasket,
    incrementProductAmount,
    decrementProductAmount,
  };
}
