import { Navigate } from "react-router-dom";
import { useAuth } from "../store/store"; 

const PrivateRoute = ({ children }) => {
  const user = useAuth(state => state.user);

  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;