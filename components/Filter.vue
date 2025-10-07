<template>
  <div class="filters">
    <div class="filters__section">
      <div class="rooms-filter">
        <button
          v-for="room in [1, 2, 3, 4]"
          :key="room"
          class="rooms-filter__button"
          :class="{ 'rooms-filter__button--active': isRoomSelected(room), 'rooms-filter__button--disabled': !store.filterState.availableRooms.some(item => item === room)}"
          :disabled="!store.filterState.availableRooms.some(item => item === room)"
          @click="toggleRoom(room)"
        >
          {{ room + "к"}}
        </button>
      </div>
    </div>

    <div class="filters__section">
      <h3 class="filters__section-title">Стоимость квартиры, ₽</h3>
      <ClientOnly>
        <RangeSlider
          :min="0"
          :max="store.filterState.priceMax"
          :step="10000"
          v-model="priceFilterValue"
          format="currency"
        />
      </ClientOnly>
    </div>

    <div class="filters__section">
      <h3 class="filters__section-title">Площадь, м²</h3>
      <ClientOnly>
        <RangeSlider
          :min="0"
          :max="store.filterState.areaMax"
          v-model="areaFilterValue"
          :step="1"
          format="area"
        />
      </ClientOnly>
    </div>    
    <button 
      class="filters__reset" 
      @click="resetFilters"
      :disabled="!hasActiveFilters"
    >
      Сбросить параметры    
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'

const store = useApartmentsStore()

const filterState = computed(() => store.filterState)

const priceFilterValue = ref<[number, number]>([0, filterState.value.priceRange[1]])

const areaFilterValue = ref<[number, number]>([0, filterState.value.areaRange[1]])

const hasActiveFilters = computed(() => {
  return filterState.value.rooms.length > 0 ||
    priceFilterValue.value[0] > 0 ||
    priceFilterValue.value[1] < filterState.value.priceRange[1] ||
    areaFilterValue.value[0] > 0 ||
    areaFilterValue.value[1] < filterState.value.areaRange[1]
})

const isRoomSelected = (room: number) => {
  return filterState.value.rooms.includes(room)
}

const toggleRoom = (room: number) => {
  const rooms = [...filterState.value.rooms]
  const index = rooms.indexOf(room)
  
  if (index > -1) {
    rooms.splice(index, 1)
  } else {
    rooms.push(room)
  }
  
  store.filterState.rooms = rooms
  store.applyFilters(priceFilterValue.value, areaFilterValue.value)
}

const resetFilters = () => {
  priceFilterValue.value = [0, store.filterState.priceMax]
  areaFilterValue.value = [0, store.filterState.areaMax]
  store.resetFilters()
}


watch(priceFilterValue, () => {
  store.applyFilters(priceFilterValue.value, areaFilterValue.value)
})


watch(areaFilterValue, () => {
  store.applyFilters(priceFilterValue.value, areaFilterValue.value)
})

</script>

<style scoped lang="scss">
.filters {
  background: linear-gradient(rgba(174, 228, 178, 0.5),
    rgba(149, 208, 161, 0.5));
  border-radius: 10px;
  padding: 24px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
  }

  &__reset {
    background: none;
    color: black;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    gap: 8px;
    align-items: center;

    &:hover:not(:disabled) {
      background: $main-dark;
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
}

.rooms-filter {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  &__button {
    width: 48px;
    height: 48px;
    background: white;
    border-radius: 50%;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 6px 20px 0px #95D0A1;

    &:hover {
      background: #95D0A1;
    }

    &--active {
      background: $main-dark;
      color: #fff;
    }
    &--disabled {
      background: #fff;
      opacity: 0.7;
      cursor: default;
      &:hover {
        background-color: #fff;
      }
    }
  }
}

@media (max-width: $breakpoint-large) {
.filters {
  padding: 40px;
  }
}
</style>