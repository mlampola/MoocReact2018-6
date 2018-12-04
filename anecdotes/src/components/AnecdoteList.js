import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import Filter from './Filter'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from './../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const handleClick = (event) => {
    event.preventDefault()
    const anecdote = props.anecdotes.find(a => a.id === event.target.id)
    props.anecdoteVote(event.target.id)
    props.notificationChange(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      props.notificationReset()
    }, 5000)
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
    .filter(a => filter === '' || a.content.toLowerCase().indexOf(filter) > -1)
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
  { anecdoteVote, notificationChange, notificationReset }
)(AnecdoteList)

export default ConnectedAnecdoteList