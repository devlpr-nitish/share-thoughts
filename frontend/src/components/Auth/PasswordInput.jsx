import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password} // Make the input a controlled component
        onChange={(e) => setPassword(e.target.value)} // Update password state on change
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
};

// PropTypes for validation
PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default PasswordInput;
