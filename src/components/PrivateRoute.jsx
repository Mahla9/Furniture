import { Navigate } from "react-router-dom";
import { useAuth } from "../store/store"; 

const PrivateRoute = ({ children }) => {
  const isAuthLoading = useAuth(state=>state.isAuthLoading)
  const user = useAuth(state => state.user);

  if (isAuthLoading) return <div className="flex justify-between items-center">Loading...</div>; 
  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;