export const formatDate = (date) => {
  const dateString = new Date(date).toLocaleDateString()
  return dateString.replaceAll("/", ".")
}