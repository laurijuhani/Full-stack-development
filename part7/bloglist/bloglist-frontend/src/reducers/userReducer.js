import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    logout() {
      return null
    },
  },
})

export const { set, logout } = userSlice.actions

export const setUser = (content) => {
  return async (dispatch) => {
    blogService.setToken(content.token)
    dispatch(set(content))
  }
}

export const removeUser = () => {
  return (dispatch) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.removeToken()
      dispatch(logout())
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const login = (content) => {
  return async (dispatch) => {
    await loginService
      .login(content)
      .then((newUser) => {
        window.localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(newUser),
        )
        blogService.setToken(newUser.token)
        dispatch(set(newUser))
      })
      .catch(() => {
        dispatch(setNotification('Wrong username or password', true))
      })
  }
}

export default userSlice.reducer
