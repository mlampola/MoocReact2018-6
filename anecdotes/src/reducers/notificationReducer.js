const reducer = (store = null, action) => {
  if (action.type === 'NOTIFICATION') {
    return action.notification
  }
  if (action.type === 'RESET') {
    return null
  }

  return store
}

export const notificationChange = (notification) => {
  return {
    type: 'NOTIFICATION',
    notification
  }
}

export const notificationReset = () => {
  return {
    type: 'RESET'
  }
}

export default reducer