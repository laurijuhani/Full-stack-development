import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const allusersSlice = createSlice({
  name: 'allusers',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = allusersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default allusersSlice.reducer
