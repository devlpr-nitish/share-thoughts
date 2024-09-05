import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[450px] h-[300px] mt-[100px] p-5 bg-blue-600 bg-opacity-20 shadow-blue-300 shadow-lg border-none rounded-lg flex flex-col items-center gap-5 justify-center">
        <div className="w-full">
          <input
            type="email"
            placeholder="your email"
            className="w-full h-[30px] px-2 py-4 text-lg border-none outline-none rounded-md mb-4 shadow-md shadow-black-200"
          />

          <span className="w-full flex items-center justify-between bg-white rounded-md pr-2 shadow-md shadow-black-200">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="your password"
              className="w-full h-[30px] px-2 py-4 text-lg border-none outline-none rounded-md"
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
        <button className="w-full bg-blue-600 text-white rounded-md font-normal text-xl py-1 active:scale-95 transition-all duration-300 ease-in-out shadow-md shadow-black-200">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signin;
