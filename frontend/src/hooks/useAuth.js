import { useRecoilState } from "recoil";
import { authState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return {
    auth,
    setAuth,
    logout,
  };
};
