<template>
  <ul class="colors colors--black">
    <li
      class="colors__item"
      v-for="(color, index) in colors"
      :key="color.color.id"
    >
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          name="color"
          :value="color.color.id"
          :checked="color.color.id === currentColor"
          @change="
            changeColor(index), $emit('update:productColor', color.color.id)
          "
        />
        <span
          class="colors__value"
          :title="formatColorTitle(color.color.title)"
          :style="{ 'background-color': color.color.code }"
        >
        </span>
      </label>
    </li>
  </ul>
</template>
<script>
import { computed, defineComponent } from 'vue';
import formatColorTitle from '@/helpers/formatColorTitle';

export default defineComponent({
  props: ['colors', 'changeColor', 'productColor'],
  emits: ['update:productColor'],
  setup(props) {
    const currentColor = computed(() => {
      return props.productColor;
    });

    return {
      currentColor,
      formatColorTitle,
    };
  },
});
</script>
