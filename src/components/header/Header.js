import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { postLogoutUser } from "../../services/apiServiceUser";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";

function BasicExample() {
  const account = useSelector((state) => state.account.account);
  const isAuthStatus = useSelector((state) => state.account.isAuthStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginRouter = () => {
    navigate("/login");
  };
  const handleRegisterRouter = () => {
    navigate("/register");
  };
  const handleLogoutUser = async () => {
    const res = await postLogoutUser(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    }
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
            {isAuthStatus ? (
              <NavDropdown title={account.username} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutUser}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button variant="primary" onClick={() => handleLoginRouter()}>
                  Đăng nhập
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => handleRegisterRouter()}
                  className="ml-2"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
