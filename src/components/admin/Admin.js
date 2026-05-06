import Sidebar from "./sidebar/Sidebar";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, Outlet } from "react-router-dom";
import { postLogoutUser } from "../../services/apiServiceUser";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import Language from "../header/Language";

const Admin = (props) => {
  const account = useSelector((state) => state.account.account);
  const isAuthStatus = useSelector((state) => state.account.isAuthStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutUser = async () => {
    const res = await postLogoutUser(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="box-content-container">
        <div className="header-admin-container">
          <Nav>
            {isAuthStatus && (
              <NavDropdown title={account.username} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutUser}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
