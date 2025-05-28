export const isSSR = () => {
  return import.meta.env.SERVER_RENDERING_ENABLED
}