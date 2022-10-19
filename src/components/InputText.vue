<template>
  <BaseFormInput :title="title" :error="error">
    <input
      class="form__input"
      :type="type"
      v-model="dataValue"
      :placeholder="placeHolder"
      autocomplete="on"
    />
  </BaseFormInput>
</template>
<script>
import { computed, defineComponent } from 'vue';
import BaseFormInput from '../components/BaseFormInput.vue';

export default defineComponent({
  components: { BaseFormInput },
  props: ['title', 'error', 'modelValue', 'placeHolder', 'type'],
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
