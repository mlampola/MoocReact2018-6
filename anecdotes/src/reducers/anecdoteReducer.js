import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const restOfTheAnecdotes = store.filter(a => a.id !== action.anecdote.id)
    return [...restOfTheAnecdotes, action.anecdote]
  }

  case 'CREATE':
    return [...store, action.anecdote]

  case 'INIT_ANECDOTES':
    return action.anecdotes

  default:
    return store
  }
}

export const anecdoteCreation = (data) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      anecdote
    })
  }
}

export const anecdoteVote = (id) => {
  return async (dispatch) => {
    let anecdote = await anecdoteService.getById(id)
    anecdote.votes += 1
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      anecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export default reducer