import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import Filter from './Filter'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const handleClick = (event) => {
    event.preventDefault()
    const anecdote = props.anecdotes.find(a => a.id === event.target.id)
    props.anecdoteVote(event.target.id)
    props.notify(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      <p></p>
      <Filter />
      {props.visibleAnecdotes
        .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleClick} />
        )}
    </div>
  )
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .filter(a => filter === '' || a.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVote, notify }
)(AnecdoteList)

export default ConnectedAnecdoteList