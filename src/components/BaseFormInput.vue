<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span v-show="error" class="form__error">{{ error }}</span>
  </label>
</template>
<script>
import { defineComponent } from 'vue/';

export default defineComponent({
  props: ['title', 'error'],
});
</script>
