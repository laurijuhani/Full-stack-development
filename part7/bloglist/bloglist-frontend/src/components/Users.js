import { useSelector, shallowEqual } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Nav } from 'react-bootstrap'

const Users = ({ user }) => {
  const users = useSelector((state) => {
    const arrayToSort = [...state.allusers]
    const sorted = arrayToSort.sort((a, b) => b.blogs.length - a.blogs.length)
    return sorted
  }, shallowEqual)

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>Users</h3>

      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Nav.Link
                  as={Link}
                  to={`/users/${user.id}`}
                  className="custom-blog-link"
                >
                  {user.name}
                </Nav.Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
