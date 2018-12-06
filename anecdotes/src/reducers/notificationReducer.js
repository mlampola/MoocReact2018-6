const reducer = (store = null, action) => {
  if (action.type === 'NOTIFICATION') {
    return action.notification
  }
  if (action.type === 'RESET') {
    return null
  }

  return store
}

export const notify = (notification, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch(notificationReset())
    }, seconds * 1000)
  }
}

const notificationReset = () => {
  return {
    type: 'RESET'
  }
}

export default reducer