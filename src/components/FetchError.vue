<template>
  <div class="error__container">
    <h2>{{ message }}</h2>
    <button class="button button--primery" @click="buttonAction">
      Попробовать еще раз
    </button>
  </div>
</template>
<script>
export default {
  props: ['message', 'buttonAction'],
};
</script>
<style scoped>
.error__container {
  display: flex;
  margin: 30px;
  flex-direction: column;
  align-items: center;
}

.button {
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
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.button--primery {
  background-color: #e02d71;
  border: 0;
  color: #fff;
  font-size: 13px;
}
.button--primery:not(:disabled):focus,
.button--primery:not(:disabled):hover {
  background-color: #150c26;
}
</style>
