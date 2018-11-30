const notificationAtStart = 'Initial notification'

const reducer = (store = notificationAtStart, action) => {
  if (action.type === 'NOTIFICATION') {
    return action.notification
  }

  return store
}

export const notificationChange = (notification) => {
  return {
    type: 'NOTIFICATION',
    notification
  }
}

export default reducer