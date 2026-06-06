import { type Artist } from "@/types/artist"
import { type Filters } from "@/types/filters"

import { getArtists } from '@/services/artists'

export function useSearch() {
    const route = useRoute()
    const hasSearched = ref(false)
    const foundArtists = ref<Artist[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const search = ref((route.query.search as string) ?? '')
    const filters = ref<Filters>({
        types: route.query.types ? (route.query.types as string).split(',') : [],
        genres: route.query.genres ? (route.query.genres as string).split(',') : [],
        countries: route.query.countries ? (route.query.countries as string).split(',') : [],
    })
    const totalCount = ref(0)
    const offset = ref(0)
    const lastArtistRef = useTemplateRef('lastArtistRef')
    // const lastArtistObserver = ref<IntersectionObserver | null>(null)
    
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
    
    watch(
        () => urlParams.value,
        () => {
            navigateTo({ query: urlParams.value })
        }
    )
    
    const isSearchable = computed(() =>
        search.value.length > 0 || Object.values(filters.value).some(value => value.length > 0)
    )
    
    async function searchArtists() {
        isLoading.value = true
        error.value = null
        foundArtists.value = []
        
        if (!hasSearched.value) {
            hasSearched.value = true
        }
        
        try {
            const { artists, count } = await getArtists({ ...filters.value, search: search.value })
            
            foundArtists.value = artists
            totalCount.value = count
            
            // if (lastArtistObserver.value && lastArtistRef.value) {
            //     lastArtistObserver.value.observe(lastArtistRef.value)
            // }
        } catch(e) {
            error.value = e instanceof Error ? e.message : 'Unknown error'
        } finally {
            isLoading.value = false
        }
    }
    
    async function initSearch() {
        const { data } = await useAsyncData('artists', () =>
            getArtists({ ...filters.value, search: search.value })
        )
        
        if (data.value) {
            foundArtists.value = data.value.artists
            hasSearched.value = true
        }
    }
    
    async function loadMore() {
        if (foundArtists.value.length < totalCount.value) {
            isLoading.value = true
            
            try {
                offset.value += 100
                
                const { artists} = await getArtists({ ...filters.value, search: search.value }, offset.value)
                
                foundArtists.value.push(...artists)
            } catch(e) {
                error.value = e instanceof Error ? e.message : 'Unknown error'
            } finally {
                isLoading.value = false
            }
        }
    }
    
    onMounted(() => {
        // lastArtistObserver.value = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             loadMore()
        //         }
        //     })
        // })
    })
    
    watch(
        () => lastArtistRef.value,
        (newLastArtistRef) => {
            console.log(newLastArtistRef.$el)
            // if (el && lastArtistObserver.value) {
            //     lastArtistObserver.value.observe(el)
            // }
        }
    )
    
    return {
        isSearchable,
        hasSearched,
        isLoading,
        error,
        search,
        filters,
        foundArtists,
        searchArtists,
        initSearch,
        lastArtistRef
    }
}