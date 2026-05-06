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
import Language from "./Language";
import { useTranslation } from "react-i18next";

function BasicExample() {
  const account = useSelector((state) => state.account.account);
  const isAuthStatus = useSelector((state) => state.account.isAuthStatus);
  const { t } = useTranslation();

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
              {t("header.t-home")}
            </NavLink>
            <NavLink to="/user" className="nav-link">
              {t("header.t-user")}
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              {t("header.t-admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthStatus ? (
              <NavDropdown title={account.username} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.3">
                  {t("header.t-profile")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutUser}>
                  {t("header.t-logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button variant="primary" onClick={() => handleLoginRouter()}>
                  {t("header.t-login")}
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => handleRegisterRouter()}
                  className="ml-2"
                >
                  {t("header.t-signup")}
                </Button>
              </>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
