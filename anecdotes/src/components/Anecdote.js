import React from 'react'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes &nbsp;
        <button id={anecdote.id} onClick={handleVote}>
          Vote
        </button>
      </div>
    </div>
  )
}

export default Anecdote