export const clamp = (number, min, max) => {
  return Math.max(min, Math.min(number, max));
}

export const throttle = (callback, delay = 1000) => {

  let pending = false
  let pendingArgs;

  const timeout = () => {
    if (pendingArgs == null) {
      return pending = false
    }
      callback(...pendingArgs)
      pendingArgs = null
      setTimeout(timeout, delay);
  }

  // Returning a throttled version 
  return (...args) => {

    if (pending) {
      pendingArgs = args
      return
    }
    
    callback(...args); // Execute the main function 
    pending = true

    setTimeout(timeout, delay);
  }
}