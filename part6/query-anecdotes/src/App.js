import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnec) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', 
      anecdotes.map(anec => 
        anec.id !== updatedAnec.id ? anec : updatedAnec
      ))
    },
  })

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch(`anecdote '${anecdote.content}' voted`)
    setTimeout(() => {
      dispatch(null)
    }, 5000);
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
