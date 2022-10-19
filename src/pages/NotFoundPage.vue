<template>
  <div class="container">
    <img :src="img" />
    <router-link class="link link--primery" :to="{ name: 'main' }"
      >Вернуться на главную</router-link
    >
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import img from '@/assets/404.png';
export default defineComponent({
  setup() {
    return { img };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  margin: 30px auto;
  flex-direction: column;
  align-items: center;
}

.link {
  margin: 0;
  border: 0;
  font: inherit;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
  padding: 25px 15px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: 'Circe', 'Arial', sans-serif;
  vertical-align: middle;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
}
.link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.link--primery {
  background-color: #e02d71;
  border: 0;
  color: #fff;
  font-size: 13px;
}
.link--primery:not(:disabled):focus,
.link--primery:not(:disabled):hover {
  background-color: #150c26;
}
</style>
