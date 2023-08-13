import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return null
    }
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, seconds) => (dispatch) => {
  dispatch(displayNotification(message))

  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000);
}