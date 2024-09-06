import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { backendUrl } from "../../store/atoms/atom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/users/signup`, {
        name,
        email,
        password,
      });

      if (response.status !== 200) {
        alert("Sign-up failed. Please check your credentials and try again.");
        return;
      }

      console.log("Sign-up successful");
      navigate("/");
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert("There was an error signing");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[450px] h-[300px] mt-[100px] p-5 bg-blue-600 bg-opacity-20 shadow-blue-300 shadow-lg border-none rounded-lg flex flex-col items-center gap-5 justify-center">
        <div className="w-full">
          <input
            type="text"
            value={name}
            placeholder="Enter username"
            className="w-full h-[30px] px-2 py-4 text-lg border-none outline-none rounded-md mb-4 shadow-md shadow-black-200"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            className="w-full h-[30px] px-2 py-4 text-lg border-none outline-none rounded-md mb-4 shadow-md shadow-black-200"
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="w-full flex items-center justify-between bg-white rounded-md pr-2 shadow-md shadow-black-200">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
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
          already have an account?{" "}
          <Link to="/signIn" className="text-blue-800 underline">
            Signin
          </Link>
        </span>
        <button
          className="w-full bg-blue-600 text-white rounded-md font-normal text-xl py-1 active:scale-95 transition-all duration-300 ease-in-out shadow-md shadow-black-200"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
