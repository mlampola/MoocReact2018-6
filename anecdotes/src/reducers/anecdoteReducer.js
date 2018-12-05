import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const saveVote = async (anecdote) => {
  await anecdoteService.update(anecdote)
}

const reducer = (store = initialState, action) => {

  switch (action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    voted.votes = voted.votes + 1
    saveVote(voted)
    return [...old, voted]
  }

  case 'CREATE':
    return [...store, action.data]

  case 'INIT_ANECDOTES':
    return action.data

  default:
    return store
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer