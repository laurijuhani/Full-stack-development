import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { initializeUsers } from './allusersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    like(state, action) {
      const id = action.payload.id
      const blogToLike = state.find((b) => b.id === id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : likedBlog))
    },
    deleteOne(state, action) {
      const id = action.payload.id
      return state.filter((blog) => blog.id !== id)
    },
    addComment(state, action) {
      const id = action.payload.id
      const blogtoAddComment = state.find((b) => b.id === id)
      const updatedComments = blogtoAddComment.comments.concat(
        action.payload.comment,
      )
      const modifiedBlog = {
        ...blogtoAddComment,
        comments: updatedComments,
      }

      return state.map((blog) => (blog.id !== id ? blog : modifiedBlog))
    },
  },
})

export const { appendBlog, setBlogs, like, deleteOne, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const newBlog = (content) => {
  return async (dispatch) => {
    await blogService
      .create(content)
      .then((returnedBlog) => {
        dispatch(appendBlog(returnedBlog))
        dispatch(initializeUsers())
        dispatch(
          setNotification(
            `a new blog ${content.title} by ${content.author} added`,
            false,
          ),
        )
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, true))
      })
  }
}

export const likeBlog = (content) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(content)
    dispatch(like(likedBlog))
    dispatch(setNotification(`liked ${content.title} by ${content.author}`))
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    await blogService
      .deleteBlog(content)
      .then(() => {
        dispatch(deleteOne(content))
        dispatch(initializeUsers())
        dispatch(
          setNotification(
            `Removed ${content.title} by ${content.author}`,
            false,
          ),
        )
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, true))
      })
  }
}

export const commentToBlog = (content) => {
  return async (dispatch) => {
    await blogService.commentBlog(content).then(() => {
      dispatch(addComment(content))
      dispatch(setNotification('comment added'))
    })
  }
}

export default blogSlice.reducer
