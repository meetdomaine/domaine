//  src/cachedFetch.js
const map = new Map()

// Makes an http request when called the first time.
// Reuses data from map when called with the same url string a second time.
export default async function (url, headers) {
    const cachedData = map.get(url)
    if (cachedData) return cachedData
    
    const response = await fetch(url, headers)
    const data = await response.json()
    map.set(url, data)
    return data
}