import { user_Store } from "../../store/store";
import { useNavigate } from "react-router-dom";

function Logout() {
    const logout = user_Store(state=>state.logout);
    const navigate = useNavigate()

  logout();
  navigate('/')
}

export default Logout;