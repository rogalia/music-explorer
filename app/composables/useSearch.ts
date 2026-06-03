import { type Artist } from "@/types/artist"
import { type Filters } from "@/types/filters"

import { getArtists } from '@/services/artists'

export function useSearch() {
    const route = useRoute()
    const userSearched = ref(false)
    const foundArtists = ref<Artist[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const search = ref((route.query.search as string) ?? '')
    const filters = ref<Filters>({
        types: route.query.types ? (route.query.types as string).split(',') : [],
        genres: route.query.genres ? (route.query.genres as string).split(',') : [],
        countries: route.query.countries ? (route.query.countries as string).split(',') : [],
    })
    
    const urlParams = computed(() => {
        const params = Object.fromEntries(
            Object.entries(filters.value)
                .filter(([, arr]) => arr.length > 0)
                .map(([key, arr]) => [key, arr.join(',')])
        )
        
        if (search.value.length) {
            params.search = search.value
        }
        
        return params
    })
    
    async function searchArtists() {
        loading.value = true
        error.value = null
        foundArtists.value = []
        
        if (!userSearched.value) {
            userSearched.value = true
        }
        
        await navigateTo({ query: urlParams.value })
        
        try {
            const { artists, count } = await getArtists({ ...filters.value, search: search.value })
            
            foundArtists.value = artists
        } catch(e) {
            error.value = e instanceof Error ? e.message : 'Unknown error'
        } finally {
            loading.value = false
        }
    }
    
    return {
        userSearched,
        loading,
        error,
        search,
        foundArtists,
        searchArtists,
        filters
    }
}