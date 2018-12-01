import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleClick = (event) => {
    event.preventDefault()
    const anecdote = this.props.store.getState().anecdotes.find(a => a.id === event.target.id)
    this.props.store.dispatch(anecdoteVote(event.target.id))
    this.props.store.dispatch(notificationChange(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      this.props.store.dispatch(notificationReset())
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter.toLowerCase()
    return (
      <div>
        {anecdotes
          .filter(a => filter === '' || a.content.toLowerCase().indexOf(filter) > -1)
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button id={anecdote.id} onClick={this.handleClick}>
                  Vote
                </button>
              </div>
            </div>)}
      </div>
    )
  }
}

export default AnecdoteList
