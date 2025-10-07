export interface Apartment {
  id: number
  image: string
  title: string
  description: string
  area: number
  floor: number
  price: number
  rooms: number
}

export interface FilterState {
  rooms: number[]
  priceRange: [number, number]
  areaRange: [number, number]
  availableRooms: number[]
  priceMax: number
  areaMax: number
}

export interface SortState {
  field: 'area' | 'floor' | 'price'
  direction: 'asc' | 'desc'
}