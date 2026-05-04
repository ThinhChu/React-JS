import App from "./App";
import { Route, Routes } from "react-router-dom";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import HomePage from "./components/home/HomePage";
import Dashboard from "./components/admin/Dashboard";
import ManageUsers from "./components/admin/users/ManageUsers";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailQuiz from "./components/user/DetailQuiz";
import NotFound from "./components/NotFound";
import ManageQuizs from "./components/admin/quizs/ManageQuizs";
import ManageQuestions from "./components/admin/questions/ManageQuestions";
import PrivateRoutes from "./routes/PrivateRoutes";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="user"
            element={
              <PrivateRoutes>
                <User />
              </PrivateRoutes>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="quiz/:id" element={<DetailQuiz />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="admin"
          element={
            <PrivateRoutes>
              <Admin />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-quizs" element={<ManageQuizs />} />
          <Route path="manage-questions" element={<ManageQuestions />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Layout;
