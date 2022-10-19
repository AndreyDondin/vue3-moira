<template>
  <BaseFormInput :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      v-model="dataValue"
      :placeholder="placeHolder"
    />
  </BaseFormInput>
</template>
<script>
import { computed, defineComponent } from 'vue';
import BaseFormInput from '../components/BaseFormInput.vue';

export default defineComponent({
  components: { BaseFormInput },
  props: ['title', 'error', 'modelValue', 'placeHolder'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dataValue = computed({
      get() {
        return props.value;
      },
      set(modelValue) {
        emit('update:modelValue', modelValue);
      },
    });
    return { dataValue };
  },
});
</script>
