import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs, setMessage }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setLikes(blog.likes)
  }, [blog.likes])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    blogService
      .like(blog)
      .then(() => {
        setLikes( likes + 1 )
      })
  }

  const handleBlogDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog)
      blogService
        .getAll()
        .then(initialBlogs => {
          initialBlogs = initialBlogs.filter(obj => obj.id !== blog.id)
          setBlogs(initialBlogs)
          setMessage(`Removed ${blog.title} by ${blog.author}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div className='blog'>
      {!visible ? (
        <div>
          {blog.title}
          <button id={(blog.title).replace(/ /g, '-')} onClick={toggleVisibility}>view</button>
        </div>
      ) : (
        <div className='details'>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>
        likes: {likes}
            <button id='like' onClick={likeBlog}>like</button>
          </p>
          <p>{blog.author}</p>
          <>
            {(
              blog.user.id === user.id ||
              blog.user === user.id
            ) ? (
                <button onClick={handleBlogDelete}>remove</button>
              ) : null
            }
          </>
        </div>
      )}
    </div>
  )
}

export default Blog