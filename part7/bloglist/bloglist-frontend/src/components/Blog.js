import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, commentToBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const like = () => {
    dispatch(likeBlog(blog))
  }

  const handleBlogDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()

    const content = {
      id: blog.id,
      comment: comment.trim(),
    }

    setComment('')

    if (content.comment === '' || /^ *$/.test(content.comment)) {
      dispatch(setNotification('comment cant be empty', true))
      return
    }

    dispatch(commentToBlog(content))
  }

  const commentForm = () => (
    <form onSubmit={handleComment}>
      <input
        id="comment"
        type="text"
        value={comment}
        name="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )

  if (!blog || !user) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a
          className="custom-blog-link"
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {blog.url}
        </a>
      </p>
      <p>
        {blog.likes} likes
        <button id="like" onClick={like}>
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      <>
        {blog.user.id === user.id || blog.user === user.id ? (
          <button onClick={handleBlogDelete}>remove</button>
        ) : null}
      </>

      <h6>comments</h6>
      {commentForm()}
      <ListGroup>
        {blog.comments.map((c) => (
          <ListGroup.Item key={c}>{c}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog
