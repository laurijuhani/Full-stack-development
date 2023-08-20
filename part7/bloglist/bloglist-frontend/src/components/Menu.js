import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import LoginForm from './LoginForm'

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} style={padding} to="/">
            home
          </Nav.Link>

          <Nav.Link as={Link} style={padding} to="/users">
            users
          </Nav.Link>

          {user ? (
            <Nav.Link as="span">
              <LoginForm user={user} />
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
