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
          <router-link class="breadcrumbs__link" :to="{ name: 'basket' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>
    <FetchLoading v-if="$store.state.loadingBasketData" />
    <FetchError
      v-else-if="$store.state.errorBasketData"
      :message="$store.state.errorMessage"
    />
    <section v-else class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        autocomplete="on"
        @submit.prevent="makeOrder(formData)"
      >
        <div class="cart__field">
          <div class="cart__data">
            <InputText
              v-model="formData.name"
              title="ФИО"
              type="text"
              placeHolder="Введите ваше полное имя"
              :error="errorForm.name"
            />

            <InputText
              v-model="formData.address"
              title="Адрес доставки"
              type="text"
              placeHolder="Введите ваш адрес"
              :error="errorForm.address"
            />

            <InputText
              v-model="formData.phone"
              type="tel"
              title="Телефон"
              placeHolder="Введите ваш телефон через (+7)"
              :error="errorForm.phone"
            />
            <InputText
              v-model="formData.email"
              type="email"
              title="Email"
              placeHolder="Введи ваш Email"
              :error="errorForm.email"
            />
            <InputTextArea
              v-model="formData.comment"
              title="Комментарий к заказу"
              placeHolder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>

            <ul class="cart__options options">
              <li
                class="options__item"
                v-for="item in deliveries"
                :key="item.id"
              >
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    :value="item.id"
                    v-model="formData.deliveryTypeId"
                  />
                  <span class="options__value">
                    {{ item.title }} <b v-if="item.price === '0'">бесплатно</b
                    ><b v-else>{{ item.price }} ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <div class="cart__options-errors"></div>
            <ul class="cart__options options">
              <li class="options__item" v-for="item in payments" :key="item.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="item.id"
                    v-model="formData.paymentTypeId"
                  />
                  <span class="options__value">
                    {{ item.title }} при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.pricePretty }}</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b v-if="formData.deliveryTypeId === 1">бесплатно</b>
              <b v-else>{{ formatNumber(deliveries[1].price) }} ₽</b>
            </p>
            <p>
              Итого: <b>{{ products.length }}</b> товара на сумму
              <b v-if="formData.deliveryTypeId === 1">{{
                totalPrice.prettySum
              }}</b>
              <b v-else
                >{{
                  formatNumber(totalPrice.sum + Number(deliveries[1].price))
                }}
                ₽</b
              >
            </p>
            <span
              v-show="errorForm.paymentTypeId"
              class="cart__options-message"
              >{{ errorForm.paymentTypeId }}</span
            >
          </div>

          <button class="cart__button button button--primery" type="submit">
            <FetchSpinner v-if="makingOrder" />
            <span v-else>Оформить заказ</span>
          </button>
        </div>
        <div v-if="errorOrder" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ errorOrder }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import InputText from '@/components/InputText.vue';
import InputTextArea from '@/components/InputTextArea.vue';
import useMakeOrder from '@/hooks/useMakeOrder';
import FetchSpinner from '@/components/FetchSpinner.vue';
import formatNumber from '@/helpers/formatNumber';
import FetchLoading from '@/components/FetchLoading.vue';
import FetchError from '@/components/FetchError.vue';

export default defineComponent({
  components: {
    InputText,
    InputTextArea,
    FetchSpinner,
    FetchLoading,
    FetchError,
  },
  setup() {
    const store = useStore();
    const formData = reactive({
      name: '',
      address: '',
      phone: '',
      email: '',
      deliveryTypeId: 1,
      paymentTypeId: 1,
      comment: '',
    });
    const {
      makingOrder,
      errorOrder,
      makeOrder,
      delivery,
      deliveries,
      payments,
      payment,
      errorForm,
    } = useMakeOrder();
    const products = computed(() => store.getters.getBasketProductData);
    const totalPrice = computed(() => store.getters.getTotalPrice);

    delivery();
    payment(formData.deliveryTypeId);

    return {
      products,
      totalPrice,
      formData,
      deliveries,
      payments,
      errorForm,
      makeOrder,
      errorOrder,
      makingOrder,
      formatNumber,
    };
  },
});
</script>
