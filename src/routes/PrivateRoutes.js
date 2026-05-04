import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  const { children } = props;
  const isAuthStatus = useSelector((state) => state.account.isAuthStatus);

  if (!isAuthStatus) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
export default PrivateRoutes;
