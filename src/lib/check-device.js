export let isMobileBreakpoint = window.innerWidth <= 768

export const getIsMobile = () => {
  const isMobileBrowser = navigator.userAgentData?.mobile
  const isMobileBreakpoint = window.innerWidth <= 768
  return (isMobileBrowser || isMobileBreakpoint)
}