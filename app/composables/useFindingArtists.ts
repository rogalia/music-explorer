import { type Artist } from "@/types/artist"
import { type Filters } from "@/types/filters"

import { getArtists } from '@/services/artists'

import ArtistCard from "@/components/ArtistCard.vue"

export function useFindingArtists() {
    const route = useRoute()
    const hasSearched = ref(false)
    const foundArtists = ref<Artist[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const search = ref<string>((route.query.search as string) ?? '')
    const filters = ref<Filters>({
        types: route.query.types ? (route.query.types as string).split(',') : [],
        genres: route.query.genres ? (route.query.genres as string).split(',') : [],
        countries: route.query.countries ? (route.query.countries as string).split(',') : [],
    })
    const totalCount = ref(0)
    const offset = ref(0)
    const limit = ref(100)
    
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
        offset.value = 0
        
        if (!hasSearched.value) {
            hasSearched.value = true
        }
        
        try {
            const { artists, count } = await getArtists({ ...filters.value, search: search.value })
            
            foundArtists.value = artists
            totalCount.value = count
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
            totalCount.value = data.value.count
            hasSearched.value = true
        }
    }
    
    const isMoreArtists = computed<boolean>(() => foundArtists.value.length < totalCount.value)
    const lastArtistObserver = ref<IntersectionObserver | null>(null)
    const foundArtistsRefs = useTemplateRef<typeof ArtistCard>('foundArtists')
    
    async function loadMore() {
        if (isMoreArtists.value) {
            isLoading.value = true
            
            try {
                offset.value += limit.value
                
                const { artists} = await getArtists({ ...filters.value, search: search.value }, offset.value)
                
                foundArtists.value = [...foundArtists.value, ...artists]
            } catch(e) {
                error.value = e instanceof Error ? e.message : 'Unknown error'
            } finally {
                isLoading.value = false
            }
        }
    }
    
    function observeLastArtist() {
        if (foundArtistsRefs.value && lastArtistObserver.value && isMoreArtists.value) {
            const lastArtistEl = foundArtistsRefs.value[foundArtistsRefs.value.length - 1].cardRef
            
            lastArtistObserver.value.observe(lastArtistEl)
        }
    }
    
    onMounted(() => {
        lastArtistObserver.value = new IntersectionObserver((entries) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    loadMore()
                    
                    lastArtistObserver?.value?.unobserve(entry.target)
                }
            })
        })
        
        if (foundArtists.value.length) {
            observeLastArtist()
        }
    })
    
    watch(
        () => foundArtists.value,
        (newVal: Artist[]) => {
            if (newVal.length) {
                nextTick(() => {
                    observeLastArtist()
                })
            }
        },
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
    }
}