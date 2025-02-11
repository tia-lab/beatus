export interface DatoAddress {
  address: {
    street_number?: string
    route?: string
    locality?: string
    administrative_area_level_2?: string
    administrative_area_level_1?: string
    country?: string
    postal_code?: string
    name?: string
    formatted_address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
}
