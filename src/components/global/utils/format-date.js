export const formatDate = (date) => {
  const dateObject = new Date(date)
  const formattedDate = `${(dateObject.getMonth() + 1).toString().padStart(2, "0")}.${(dateObject.getDate() + 1).toString().padStart(2, "0")}.${dateObject.getFullYear().toString().padStart(2, "0")}`
  return formattedDate  
}