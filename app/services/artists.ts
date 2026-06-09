import { mbFetch } from '@/api/mbFetch'
import { mbEndpoints } from "@/api/mbEndpoints"

import { type ArtistsResponse } from '@/types/artist'
import { type Filters } from '@/types/filters'

interface GetArtistsParams extends Filters {
    search?: string
}

function getMBQuery(params: GetArtistsParams): string {
    const filtersMapping: Record<keyof Filters, string> = {
        types: 'type',
        countries: 'country',
        genres: 'tag'
    }
    
    return Object.entries(params)
        .reduce((mbQuery, entry) => {
            const [key, value] = entry as [keyof GetArtistsParams, string | string[]]
            
            if (!value.length) {
                return mbQuery
            }
            
            if (mbQuery.length) {
                mbQuery += ' AND '
            }
            
            if (key === 'search') {
                mbQuery += value
            } else if (Array.isArray(value)){
                mbQuery += `${filtersMapping[key]}:(${value.map(item => `"${item}"`).join(' OR ')})`
            }
            
            return mbQuery
        }, '')
}

export async function getArtists(queryParams: GetArtistsParams, offset: number = 0): Promise<ArtistsResponse> {
    const artists = await mbFetch<ArtistsResponse>(mbEndpoints.getArtists, {query: getMBQuery(queryParams), limit: '100', offset: String(offset)})
    
    // console.log(artists)
    
    return artists
}