import { create } from 'zustand'

interface Filters {
  departements: string[]
  disciplines: string[]
  languages: string[]
  nationalities: string[]
}

interface State {
  filters: Filters
  fetchUrl: string
}
/*eslint-disable no-unused-vars*/
interface Actions {
  setFilters: (filters: Partial<Filters>) => void
  resetFilters: (baseURL: string, locale: string) => void
  generateFetchUrl: (baseURL: string, locale: string) => void
  initializeUrl: (baseURL: string, locale: string) => void
}

const useStoreTeam = create<State & Actions>((set) => ({
  // Initial state
  filters: {
    departements: [],
    disciplines: [],
    languages: [],
    nationalities: []
  },
  fetchUrl: '', // Empty initially

  // Actions
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters }
    })),
  resetFilters: (baseURL, locale) =>
    set(() => ({
      filters: {
        departements: [],
        disciplines: [],
        languages: [],
        nationalities: []
      },
      fetchUrl: `/api/team-members?locale=${locale}` // Reset to default URL with locale
    })),
  generateFetchUrl: (baseURL, locale) =>
    set((state) => {
      const queryParams = new URLSearchParams({
        locale,
        ...(state.filters.departements.length && {
          departement: state.filters.departements.join(',')
        }),
        ...(state.filters.disciplines.length && {
          discipline: state.filters.disciplines.join(',')
        }),
        ...(state.filters.languages.length && {
          language: state.filters.languages.join(',')
        }),
        ...(state.filters.nationalities.length && {
          nationality: state.filters.nationalities.join(',')
        })
      })

      return { fetchUrl: `${baseURL}/api/team-members?${queryParams}` }
    }),
  initializeUrl: (baseURL, locale) =>
    set((state) => ({
      fetchUrl: state.fetchUrl || `${baseURL}/api/team-members?locale=${locale}` // Set initial URL if empty
    }))
}))

export default useStoreTeam
