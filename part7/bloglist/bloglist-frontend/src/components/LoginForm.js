import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login, removeUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    const newUser = {
      username: username,
      password: password,
    }

    dispatch(login(newUser))
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(removeUser())
    navigate('/')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  return (
    <>
      {!user && loginForm()}
      {user && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <p>{user.name} logged in</p>
          {logoutForm()}
        </div>
      )}
    </>
  )
}

LoginForm.propTypes = {
  user: PropTypes.object,
}

export default LoginForm
