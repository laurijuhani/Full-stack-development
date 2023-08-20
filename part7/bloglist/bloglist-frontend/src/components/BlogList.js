import { Link } from 'react-router-dom'
import { ListGroup, Nav } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  return (
    <ListGroup>
      {blogs.map((blog) => (
        <ListGroup.Item key={blog.id}>
          <Nav.Link
            as={Link}
            to={`/blogs/${blog.id}`}
            className="custom-blog-link"
          >
            {blog.title}
          </Nav.Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default BlogList
