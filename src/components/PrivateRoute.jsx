import { Navigate } from "react-router-dom";
import { useAuth } from "../store/store"; // استور لاگین

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default PrivateRoute;