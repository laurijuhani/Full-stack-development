import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogfromRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [blogs])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      setUser(newUser)
      blogService.setToken(newUser.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogfromRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      {user ? (
        <h1>blogs</h1>
      ) : (
        <h1>log in to application</h1>
      )}

      <Notification
        message={message}
        errorMessage={errorMessage}
      />

      <LoginForm
        setUser={setUser}
        user={user}
        setErrorMessage={setErrorMessage}
      />

      {user ? (
        <>
          <Togglable buttonLabel="new blog" ref={blogfromRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          {blogs.map((blog) => <Blog
            key={blog.id}
            blog={blog}
            user={user}
            setBlogs={setBlogs}
            setMessage={setMessage}
          />)}
        </>
      ) : null}
    </div>
  )
}

export default App