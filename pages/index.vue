<template>
  <div class="apartments-page">
    <main class="page-main">
      <div class="container">
        <div class="layout">
          <section class="apartments-section">
            <ApartmentList />            
            <button v-if="showAddMore" @click="store.loadMore" class="add-more">
              Загрузить еще
            </button>
          </section>
          <aside class="filters-sidebar">
            <Filter />
          </aside>          
        </div>
      </div>
    </main>
    <UpButton />
  </div>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'

const store = useApartmentsStore()

store.fetchApartments()
const showAddMore = computed(() => store.currentPage < store.lastpage)
</script>

<style scoped lang="scss">
.apartments-page {
  background-color: white;
  padding: 40px 0;
}

.add-more {
  background-color: white;
  padding: 8px 24px;
  line-height: 24px;
  border: 1px solid #0B173933;
  border-radius: 25px;
  align-self: center;
  margin: 20px auto;
  cursor: pointer;
  &:hover {
    background: #ffffff59;
  }
}

.layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 28px;
}


@media (min-width: $breakpoint-desktop) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 80px;
  }
}
</style>