<template>
  <div class="apartments-list">
    <h1 class="apartments-list__title">Квартиры</h1>
    <div v-if="store.isLoading" class="loading">Загрузка...</div>
    
    <div v-else-if="store.displayedApartments.length === 0" class="empty-state">
      Квартиры не найдены
    </div>

    <table v-else class="apartments-table apartments-table--desktop">
      <thead class="apartments-table__head">
        <tr>
          <th class="apartments-table__header apartments-table__header--layout">Планировка</th>
          <th class="apartments-table__header apartments-table__header--apartment">Квартира</th>
          <th class="apartments-table__header apartments-table__header--sortable"><SortButton type="area"/></th>
          <th class="apartments-table__header apartments-table__header--sortable"><SortButton type="floor"/></th>
          <th class="apartments-table__header apartments-table__header--sortable"><SortButton type="price"/></th>
        </tr>
      </thead>
      <tbody class="apartments-table__body">
        <tr
          v-for="apartment in store.displayedApartments"
          :key="apartment.id"
          class="apartments-table__row"
        >
          <td class="apartments-table__cell apartments-table__cell--layout">
            <img
              :src="apartment.image"
              :alt="`Планировка квартиры ${apartment.title}`"
              class="apartments-table__image"
            />
          </td>
          <td class="apartments-table__cell apartments-table__cell--apartment">
            <h3 class="apartments-table__title">{{ apartment.title }}</h3>
            <p class="apartments-table__description">{{ apartment.description }}</p>
          </td>
          <td class="apartments-table__cell apartments-table__cell--area">
            {{ apartment.area }} м²
          </td>
          <td class="apartments-table__cell apartments-table__cell--floor">
            {{ apartment.floor }}
          </td>
          <td class="apartments-table__cell apartments-table__cell--price">
            {{ apartment.price }} ₽
          </td>
        </tr>
      </tbody>
    </table>

    <div class="apartments-cards apartments-cards--mobile">
      <div class="apartments-cards__header">        
         <SortButton type="area"/>
         <SortButton type="floor"/>
        <SortButton type="price"/>
      </div>
      <div
        v-for="apartment in store.displayedApartments"
        :key="apartment.id"
        class="apartment-card"
      >
        <div class="apartment-card__layout">
          <div class="apartment-card__content">
            <div class="apartment-card__header">
              <h3 class="apartment-card__title">{{ apartment.title }}</h3>
              <p class="apartment-card__description">{{ apartment.description }}</p>
            </div>
            <div class="apartment-card__details">
                <span class="apartment-card__detail-value">{{ apartment.area }} м²</span>
                <span class="apartment-card__detail-value">{{ apartment.floor }} из 17</span>
                <span class="apartment-card__detail-value">{{ apartment.price }} ₽</span>
            </div>
          </div>
          <div class="apartment-card__image-section">
            <img
              :src="apartment.image"
              :alt="`Планировка квартиры ${apartment.title}`"
              class="apartment-card__image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'
import SortButton from './SortButton.vue'

const store = useApartmentsStore()
</script>

<style scoped lang="scss">

.apartments-list__title {
  font-size: 54px;
  font-weight: 700;
  margin-bottom: 48px;
} 

.apartments-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;

  &--desktop {
    display: table;
  }

  &__header {
    padding: 16px;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid $color-border;
  }

  &__row {
    border-bottom: 1px solid $color-border;
    transition: background-color 0.3s ease;

    &:hover {
      background: $color-background;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__cell {
    padding: 16px;
    vertical-align: top;
  }

  &__image {
    width: 100px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }

  &__title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__description {
    font-size: 14px;
    color: #666;
  }
}

.apartments-cards {
  display: none;
  gap: 16px;
  &__header {
    display: flex;
    gap: 10px;
  }
}

.apartment-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid $color-border;

  &__layout {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  &__image-section {
    flex-shrink: 0;
  }

  &__image {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__header {
    margin-bottom: 8px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 4px;
    color: #333;
  }

  &__description {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }

  &__details {
    display: flex;
    gap: 20px;
  }

  &__detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    &--price {
      margin-top: 4px;
      padding-top: 6px;
      border-top: 1px solid #f0f0f0;
      font-weight: 600;
      color: #333;
    }
  }

  &__detail-label {
    color: #666;
  }

  &__detail-value {
    color: #333;
    font-weight: 500;
  }
}


@media (max-width: $breakpoint-large) {
  .apartments-table--desktop {
    display: none;
  }

  .apartments-cards--mobile {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: $breakpoint-desktop) {
  .apartments-table {
    &__header,
    &__cell {
      padding: 12px 8px;
    }

    &__image {
      width: 80px;
      height: 60px;
    }
  }
}
</style>