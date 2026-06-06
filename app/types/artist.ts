export interface Artist {
    id: string,
    name: string,
    type: string,
    country: string,
}

export interface ArtistsResponse {
    artists: Artist[],
    count: number,
    created: string,
    offset: number,
}

export interface ArtistPreview {
    id: string,
    name: string,
    type: string,
    country: string,
}

export interface ArtistImageResponse {
    thumbnail?: {
        source?: string
    }
}