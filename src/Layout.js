import App from "./App";
import { Route, Routes } from "react-router-dom";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import HomePage from "./components/home/HomePage";
import Dashboard from "./components/admin/Dashboard";
import ManageUsers from "./components/admin/users/ManageUsers";
import Login from "./components/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<User />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Layout;
