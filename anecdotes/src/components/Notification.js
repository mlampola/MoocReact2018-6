import React from 'react'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'

class Notification extends React.Component {
  render() {
    const { notification } = this.props
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      notification === null ? null :
        <div style={style}>
          {notification}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  { notify }
)(Notification)

export default ConnectedNotification