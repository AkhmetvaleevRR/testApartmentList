<template>
  <div class="sort">
    <div class="sort__options">
      <button
        class="sort__button"
        :class="{
          'sort__button--active': store.sortState.field === type,
          'sort__button--desc': store.sortState.field === type && store.sortState.direction === 'desc'
        }"
        @click="handleSort(type)"
      >
        {{ dict[type] }}   
      </button>      
      <img :src="iconType" alt="sort icon" class="sort__icon"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconUrl1 from '../assets/icons/arows_both.svg'
import iconUrl2 from '../assets/icons/arrow_desc.svg'
import iconUrl3 from '../assets/icons/arrow_asc.svg'
import { useApartmentsStore } from '~/stores/apartments'

interface Props {
  type: 'area' | 'floor' | 'price'
}

const props = defineProps<Props>()
const dict = {
  area: 'Площадь',
  floor: 'S, м²',
  price: 'Цена, ₽'
}
const store = useApartmentsStore()

const handleSort = (field: 'area' | 'floor' | 'price') => {
  let direction: 'asc' | 'desc' = 'asc'
  
  if (store.sortState.field === field) {
    direction = store.sortState.direction === 'asc' ? 'desc' : 'asc'
  }
  
  store.setSort(field, direction)
}

const iconSrc = {
  none: iconUrl1,
  desc: iconUrl2,
  asc: iconUrl3
}

const iconType = computed(() => {
  return store.sortState.field === props.type 
    ? iconSrc[store.sortState.direction] 
    : iconSrc.none
})
</script>

<style scoped lang="scss">
.sort {
  &__button {
    cursor: pointer;
    &--active {
      color: $main-dark;
    }
  }
  &__icon {
    display: inline;
    margin-left: 10px;
  }
}
</style>