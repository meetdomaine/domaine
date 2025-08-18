export const getLocalTime = (element: HTMLElement, timezone: string, mode: string ) => {
  
    let time: Date
    let hours: string
    let minutes: string
    let seconds: string
    
    const updateTime = () => {
      
      time = new Date(new Date().toLocaleString("en-US", {timeZone: timezone } ));
      hours = time.getHours().toString().padStart(2, "0")
      minutes = time.getMinutes().toString().padStart(2, "0")
      seconds = time.getSeconds().toString().padStart(2, "0")

      if ( mode === 'customProps' ) {
        element.style.setProperty('--hours', hours)
        element.style.setProperty('--minutes', minutes)
        element.style.setProperty('--seconds', seconds)
      }

      if ( mode === 'innerText' ) {
        element.innerText = `${hours}:${minutes}`
      }

    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)
    
    // Store interval ID on element so it can be cleared later
    element.dataset.timeInterval = intervalId.toString()
    
    return intervalId
}

export const getIsDaytime = (element: HTMLElement, timezone: string ) => {
    
  let time: Date
  let hours: number
  
  const updateTime = () => {
    
    time = new Date(new Date().toLocaleString("en-US", {timeZone: timezone } ));
    hours = time.getHours()

    const isDayTime = hours > 6 && hours < 20
    element.dataset.isDaytime = isDayTime.toString()
  }

  updateTime()
  const intervalId = setInterval(updateTime, 1000)
  
  // Store interval ID on element so it can be cleared later
  element.dataset.daytimeInterval = intervalId.toString()
  
  return intervalId
}

// Helper function to clear all time intervals
export const clearTimeIntervals = (element: HTMLElement) => {
  if (element.dataset.timeInterval) {
    clearInterval(parseInt(element.dataset.timeInterval))
    delete element.dataset.timeInterval
  }
  if (element.dataset.daytimeInterval) {
    clearInterval(parseInt(element.dataset.daytimeInterval))
    delete element.dataset.daytimeInterval
  }
}

