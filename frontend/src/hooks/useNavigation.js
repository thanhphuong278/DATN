import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const gotoSignUp = () => {
    navigate("/signup");
  };

  return { goToLogin, goToHome, gotoSignUp };
}
