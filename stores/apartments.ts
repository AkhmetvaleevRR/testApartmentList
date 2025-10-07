import { defineStore } from 'pinia'
import type { Apartment, FilterState, SortState } from '~/types/apartment'

export const useApartmentsStore = defineStore('apartments', {
  state: () => ({
    apartments: [] as Apartment[],
    filteredApartments: [] as Apartment[],
    displayedApartments: [] as Apartment[],
    filterState: {
      rooms: [] as number[],
      availableRooms: [] as number[],
      priceRange: [0, 0] as [number, number],
      priceMax: 0 as number, 
      areaRange: [0, 0] as [number, number],
      areaMax: 0 as number
    } as FilterState,
    sortState: {
      field: 'price',
      direction: 'asc'
    } as SortState,
    itemsPerPage: 20,
    currentPage: 1,
    lastpage: 0, 
    isLoading: false
  }),

  actions: {
    async fetchApartments() {
      this.isLoading = true
      try {
        const data = await $fetch('/api/apartments.json')
        this.apartments = data as Apartment[]
        this.initializeFilterState()
        this.applyFilters(this.filterState.priceRange, this.filterState.areaRange)
      } catch (error) {
        console.error('Error fetching apartments:', error)
      } finally {
        this.isLoading = false
      }
    },

    initializeFilterState() {
      if (this.apartments.length === 0) return

      const prices = this.apartments.map(apartment => apartment.price)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      this.filterState.priceMax = maxPrice
      this.filterState.priceRange = [minPrice, maxPrice]

      const areas = this.apartments.map(apartment => apartment.area)
      const minArea = Math.min(...areas)
      const maxArea = Math.max(...areas)
      this.filterState.areaMax = maxArea
      this.filterState.areaRange = [minArea, maxArea]

      this.filterState.availableRooms = [...new Set(this.apartments.map(apartment => apartment.rooms))]
        .sort((a, b) => a - b)
    },

    applyFilters(priceRange: [number, number], areaRange: [number, number]) {
      let filtered = this.apartments.filter(apartment => {
        if (this.filterState.rooms.length > 0 && 
            !this.filterState.rooms.includes(apartment.rooms)) {
          return false
        }

        if (apartment.price < priceRange[0] || 
            apartment.price > priceRange[1]) {
          return false
        }

        if (apartment.area < areaRange[0] || 
            apartment.area > areaRange[1]) {
          return false
        }

        return true
      })

      filtered = filtered.sort((a, b) => {
        const modifier = this.sortState.direction === 'asc' ? 1 : -1
        if (a[this.sortState.field] < b[this.sortState.field]) return -1 * modifier
        if (a[this.sortState.field] > b[this.sortState.field]) return 1 * modifier
        return 0
      })

      this.filteredApartments = filtered      
      this.lastpage = Math.ceil(this.filteredApartments.length / this.itemsPerPage)
      this.currentPage = 1
      this.updateDisplayedApartments()
    },

    updateDisplayedApartments() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      this.displayedApartments = this.filteredApartments.slice(0, endIndex)
    },

    loadMore() {
      if (this.hasMoreItems) {
        this.currentPage++
        this.updateDisplayedApartments()
      }
    },

    resetFilters() {
      this.filterState.rooms = []
      this.initializeFilterState()
      this.applyFilters(this.filterState.priceRange, this.filterState.areaRange)
    },

    setSort(field: 'area' | 'floor' | 'price', direction: 'asc' | 'desc') {
      this.sortState = { field, direction }
      this.applyFilters(this.filterState.priceRange, this.filterState.areaRange)
    }
  },

  getters: {
    hasMoreItems: (state) => {
      return state.displayedApartments.length < state.filteredApartments.length
    },
    totalCount: (state) => state.filteredApartments.length,
    displayedCount: (state) => state.displayedApartments.length
  }
})