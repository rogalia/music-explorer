import { mbFetch } from '@/api/mbFetch'
import { mbEndpoints } from "@/api/mbEndpoints"

import { type ArtistsResponse } from '@/types/artist'

export async function getArtists(artistName: string): Promise<ArtistsResponse> {
    const artists = await mbFetch<ArtistsResponse>(mbEndpoints.getArtists, {query: 'Metallica'})
    
    return artists
}