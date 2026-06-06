import { wpFetch } from '@/api/wpFetch'

import { type ArtistImageResponse } from '@/types/artist'

export async function getArtistImage(artistName: string): Promise<ArtistImageResponse> {
    const imageData = await wpFetch<ArtistImageResponse>(artistName)
    
    console.log(imageData)
    
    return imageData
}