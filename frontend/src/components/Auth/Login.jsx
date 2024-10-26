import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { authState, validationState } from "../../recoil/atom";
import { login } from "../../services/authService";
import PasswordInput from "./PasswordInput";

const Login = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [validationErrors, setValidationErrors] =
    useRecoilState(validationState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const errors = {
      emailError: "",
      passwordError: "",
    };

    if (!email) {
      errors.emailError = "Email is required";
      isValid = false;
    }

    if (!password) {
      errors.passwordError = "Password is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const userData = await login(email, password);
        setAuth({ user: userData.user, token: userData.token });
        navigate("/home");
      } catch {
        setValidationErrors((prev) => ({
          ...prev,
          passwordError: "Invalid credentials",
        }));
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-start justify-center">
      <div className="flex flex-col items-center lg:items-start lg:flex-row mt-36">
        <div className="lg:mr-40 relative lg:top-20 mb-4 lg:mb-0">
          <span className="text-blue-500 font-bold text-4xl lg:text-5xl">
            ShareThoughts
          </span>
          <p className="hidden lg:block text-md lg:text-2xl">
            Connect and share with people in your life.
          </p>
        </div>
        <div className="flex flex-col bg-white rounded-lg shadow-2xl p-4">
          <div className="w-[340px] flex flex-col gap-5 items-center justify-between mb-3">
            <input
              type="email"
              placeholder="Email address "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] outline-none border-2 border-gray-200 focus:border-blue-500 rounded-md px-2 py-1"
            />
            {validationErrors.emailEorr && (
              <p className="error">{validationErrors.emailEorr}</p>
            )}
            <PasswordInput password={password} setPassword={setPassword} />
            {validationErrors.passwordError && (
              <p className="error">{validationErrors.passwordError}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full h-[50px] border-none outline-none bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-md px-2 py-1"
            >
              Log In
            </button>
          </div>
          <div className="border-t-2 border-t-gray-300 flex items-center justify-center pt-3">
            <button
              onClick={() => navigate("/signup")}
              className="w-[200px] h-[50px] bg-green-600 text-white text-lg font-bold hover:bg-green-700 text-center rounded-md px-2 py-1"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
