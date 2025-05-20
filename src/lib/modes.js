export const isDev = () => {
  return import.meta.env.DEV
}

export const isProd = () => {
  return import.meta.env.PROD
}