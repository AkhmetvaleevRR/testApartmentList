<template>
  <div class="range-slider">
    <div class="range-slider__values"> 
      <span class="range-slider__value range-slider__value--min">
        <span class="range-slider__label">от</span>
        <span class="range-slider__number">{{ formatValue(internalValue[0]) }}</span>
      </span>   
      <span class="range-slider__value range-slider__value--max">
        <span class="range-slider__label">до</span>
        <span class="range-slider__number">{{ formatValue(internalValue[1]) }}</span>
      </span>
    </div>
    <div class="range-slider__control">
      <USlider
        v-model="internalValue"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        class="range-slider__input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: [number, number]
  min: number
  max: number
  step: number
  format?: 'currency' | 'area'  
}

const props = withDefaults(defineProps<Props>(), {
  format: 'currency'
})

const internalValue = ref<[number, number]>([...props.modelValue])

const emit = defineEmits<{
  'update:modelValue': [value: [number, number]]
}>()

watchEffect(() => {
  internalValue.value = props.modelValue
})

watch(() => props.max, (newValue) => {
  internalValue.value = [0, newValue]
}, { immediate: true })


watch(internalValue, (newValue: [number, number]) => {
  emit('update:modelValue', newValue)
})

const formatValue = (value: number) => {
  if (props.format === 'currency') {
    return value + ' ₽'
  } else if (props.format === 'area') {
    return value + ' м²'
  }
  return value.toString()
}

</script>

<style scoped lang="scss">
.range-slider {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  &__values {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  &__label {
    color: #666;
    font-weight: 400;
    margin-right: 10px;
  }

  &__number {
    color: #000;
    font-weight: 500;
  }

  &__value {
    font-size: 14px;
    font-weight: 500;
    color: #0B1739;
    flex-grow: 1;
  }

  :deep(.range-slider__input) {    
    .bg-accented {
      background: #c2c2c279;
      height: 6px;
      border-radius: 3px;
    }
    .ring-2 {
      background-color: var(--color-green-400, oklch(79.2% 0.209 151.711));
    }
  }
}
</style>