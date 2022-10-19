import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import BasketPage from '@/pages/BasketPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfo from '@/pages/OrderInfo.vue';

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '/basket', name: 'basket', component: BasketPage },
  { path: '/order', name: 'order', component: OrderPage },
  { path: '/orderInfo/:id', name: 'orderInfo', component: OrderInfo },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
