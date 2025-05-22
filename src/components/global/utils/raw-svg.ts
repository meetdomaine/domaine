export const getRawSvg = async (url: string) => {
  try {
    const response = await fetch(url)
    if (response.ok) return await response.text()
    console.error(`Failed to fetch SVG from ${url}: ${response.status} ${response.statusText}`)
    return ''
  } catch (error) {
    console.error(`Error fetching SVG from ${url}:`, error)
    return ''
  }
}