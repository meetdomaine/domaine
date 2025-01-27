export const getRawSvg = async (url: string) => {
  if (!url) return console.error("No URL for logo")
  const response = await fetch(url)
  if (response.ok) return await response.text()
  return 
}