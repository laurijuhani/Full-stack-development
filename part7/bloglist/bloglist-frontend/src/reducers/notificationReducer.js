import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { displayNotification, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, error) => (dispatch) => {
  const msg = {
    message: message,
    error: error,
  }

  dispatch(displayNotification(msg))

  setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}
