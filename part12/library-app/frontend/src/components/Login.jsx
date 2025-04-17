import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import { useEffect } from "react"
import PropTypes from "prop-types"

const Login = ({ setToken, setError, show, setPage }) => {
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })


  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
      setPage("authors")
    }
  }, [result.data, setToken, setPage])

  const submit = async (event) => {
    event.preventDefault()
  
    login({ variables: { username: event.target[0].value, password: event.target[1].value } })
  }

  if (!show) {
    return null
  }



  return (
    <form onSubmit={submit}>
      <div>
        name
        <input />
      </div>
      <div>
        password
        <input type="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default Login
