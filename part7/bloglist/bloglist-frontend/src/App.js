import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { initializeBlogs, newBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/allusersReducer'
import { setUser } from './reducers/userReducer'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'

const Main = ({ user }) => {
  const dispatch = useDispatch()

  const blogfromRef = useRef()

  const blogs = useSelector((state) => {
    const arrayToSort = [...state.blogs]
    const sorted = arrayToSort.sort((a, b) => b.likes - a.likes)
    return sorted
  }, shallowEqual)

  const addBlog = (blogObject) => {
    blogfromRef.current.toggleVisibility()
    dispatch(newBlog(blogObject))
  }

  return (
    <div>
      {user ? (
        <h1>blog app</h1>
      ) : (
        <>
          <h1>log in to application</h1>
          <LoginForm user={user} />
        </>
      )}

      {user ? (
        <>
          <Togglable buttonLabel="new blog" ref={blogfromRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogList blogs={blogs} />
        </>
      ) : null}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(newUser))
    }
  }, [])

  return (
    <div className="container">
      {user ? <Menu user={user} /> : null}

      <Notification />

      <Routes>
        <Route path="/" element={<Main user={user} />} />
        <Route path="/users" element={<Users user={user} />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}
export default App
