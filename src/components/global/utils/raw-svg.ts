export const getRawSvg = async (url: string) => {
  const response = await fetch(url)
  if (response.ok) return await response.text()
  return 
}