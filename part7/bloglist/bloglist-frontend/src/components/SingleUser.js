import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const SingleUser = () => {
  const users = useSelector((state) => state.allusers)
  const match = useMatch('/users/:id')
  const userMatch = match
    ? users.find((user) => user.id === match.params.id)
    : null

  if (!userMatch) {
    return null
  }
  return (
    <div>
      <h2>{userMatch.name}</h2>

      <h4>added blogs</h4>

      <ListGroup>
        {userMatch.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default SingleUser
