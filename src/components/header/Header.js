import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";

function BasicExample() {
  const navigate = useNavigate();
  const handleLoginRouter = () => {
    navigate("/login");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">ReactJS Tutorial</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/user" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {/* <NavDropdown title="Sign up" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
            </NavDropdown> */}
            <Button variant="primary" onClick={() => handleLoginRouter()}>
              Đăng nhập
            </Button>
            <Button variant="outline-primary" className="ml-2">
              Đăng ký
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
