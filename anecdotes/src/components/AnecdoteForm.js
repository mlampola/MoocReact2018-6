import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.notificationChange(`You created '${content}'`)
    setTimeout(() => {
      this.props.notificationReset()
    }, 5000)
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  { anecdoteCreation, notificationChange, notificationReset }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
