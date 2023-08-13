import { useSelector, useDispatch } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filtered = state.anecdotes.filter(n => n.content.toLowerCase().includes(state.filter))
    const sorted = filtered.sort((a,b) => b.votes - a.votes)
    return sorted
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnec(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
