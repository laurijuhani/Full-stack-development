import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnec))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const mutationOptions = {
      onSuccess: () => {
        dispatch(`you added '${content}'`)
        setTimeout(() => {
          dispatch(null)
        }, 5000)
      },
      onError: () => {
        dispatch('Too short anecdote, must have length 5 or more')
        setTimeout(() => {
          dispatch(null)
        }, 5000)
      },
    }
  
    if (content.length > 4) {
      newAnecMutation.mutate({ content, votes: 0 }, mutationOptions)
    } else {
      mutationOptions.onError()
    }  
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
