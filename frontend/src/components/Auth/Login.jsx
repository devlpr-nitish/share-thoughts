import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="w-full h-screen bg-gray-100 flex items-start justify-center">
      <div className="flex flex-row mt-36">
        <div className="mr-40 relative top-20">
          <span className="text-blue-500 font-bold text-5xl">
            ShareThoughts
          </span>
          <p className="text-2xl">
            Connect and share with people in your life.
          </p>
        </div>
        <div className="flex flex-col bg-white rounded-lg shadow-2xl p-4">
          <div className="w-[340px] flex flex-col gap-5 items-center justify-between mb-3">
            <input
              type="text"
              placeholder="Email address "
              className="w-full h-[50px] outline-none border-2 border-gray-200 focus:border-blue-500 rounded-md px-2 py-1"
            />
            <PasswordInput />
            <button className="w-full h-[50px] border-none outline-none bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-md px-2 py-1">
              Log In
            </button>
          </div>
          <div className="border-t-2 border-t-gray-300 flex items-center justify-center pt-3">
            <Link to="/signup">
              <button className="w-[200px] h-[50px] bg-green-600 text-white text-lg font-bold hover:bg-green-700 text-center rounded-md px-2 py-1">
                Create New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="w-full h-[50px] border-2 outline-none border-gray-200 focus:border-blue-500 rounded-md px-2 py-1 pr-10"
      />
      <span
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        onClick={togglePassword}
      >
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="text-gray-500"
        />
      </span>
    </div>
  );
}

export default Login;
