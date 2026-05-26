export async function mbFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let paramsString = ''
    
    if (params) {
        paramsString = new URLSearchParams(params).toString()
    }
    
    const response = await fetch(
        `https://musicbrainz.org/ws/2/${endpoint}?fmt=json${paramsString ? '&' + paramsString : ''}`,
        {
            headers: {
                'User-Agent': 'MusicExplorer/1.0 ( orlovskiy.valentine@gmail.com )'
            }
        }
    )
    const jsonResponse = await response.json()
    
    if (!response.ok) {
        throw new Error(`MusicBrainz API error: ${response.status}`)
    }
    
    return jsonResponse
}