import { type Artist } from "@/types/artist"
import { type Filters } from "@/types/filters"

import { getArtists } from '@/services/artists'

export function useSearch() {
    const userSearched = ref(false)
    const userQuery = ref('')
    const foundArtists = ref<Artist[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const filters = ref<Filters>({
        types: [],
        genres: [],
        countries: []
    })
    
    async function searchArtists() {
        loading.value = true
        error.value = null
        foundArtists.value = []
        
        if (!userSearched.value) {
            userSearched.value = true
        }
        
        try {
            const { artists, count } = await getArtists(userQuery.value)
            
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
        userQuery,
        foundArtists,
        searchArtists,
        filters
    }
}