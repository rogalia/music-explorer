export async function wpFetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${endpoint}`
    )
    
    if (!response.ok) {
        throw new Error(`WikiPedia API error: ${response.status}`)
    }
    
    const jsonResponse = await response.json()
    
    return jsonResponse
}