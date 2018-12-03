import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleClick = (event) => {
    event.preventDefault()
    const anecdote = this.props.anecdotes.find(a => a.id === event.target.id)
    this.props.anecdoteVote(event.target.id)
    this.props.notificationChange(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.notificationReset()
    }, 5000)
  }

  render() {
    const anecdotes = this.props.anecdotes
    const filter = this.props.filter.toLowerCase()
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVote, notificationChange, notificationReset }
)(AnecdoteList)

export default ConnectedAnecdoteList