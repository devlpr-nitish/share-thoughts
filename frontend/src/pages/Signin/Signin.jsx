import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { backendUrl } from "../../store/atoms/atom";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/users/signin`, {
        email,
        password,
      });

      // Handle error
      if (response.status !== 200) {
        setError(
          "Sign-in failed. Please check your credentials and try again.",
        );
        alert("Sign-in failed. Please check your credentials and try again.");
        return;
      }

      // Handle success
      console.log("Sign-in successful", response.data);
      //
      // fetch token
      const token = response.data.token;

      // Save token to local storage
      localStorage.setItem("token", token);

      // Move to Home page
      navigate("/");
    } catch (error) {
      // Handle error
      setError("Sign-in failed. Please check your credentials and try again.");
      console.error("There was an error signing in!", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[450px] h-[300px] mt-[100px] p-5 bg-blue-600 bg-opacity-20 shadow-blue-300 shadow-lg border-none rounded-lg flex flex-col items-center gap-5 justify-center">
        <div className="w-full">
          <input
            type="email"
            value={email}
            placeholder="your email"
            className="w-full h-[30px] px-2 py-4 text-lg border-none outline-none rounded-md mb-4 shadow-md shadow-black-200"
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="w-full flex items-center justify-between bg-white rounded-md pr-2 shadow-md shadow-black-200">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="your password"
              className="w-full h-[30px] px-2 py-4 text-lg border-none outline-none rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-gray-500"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </span>
        </div>
        <span className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-800 underline">
            Signup
          </Link>
        </span>
        <button
          className="w-full bg-blue-600 text-white rounded-md font-normal text-xl py-1 active:scale-95 transition-all duration-300 ease-in-out shadow-md shadow-black-200"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signin;
