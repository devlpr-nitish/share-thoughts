import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { validationState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import PasswordInput from "./PasswordInput";

const InputForm = ({ setFirstName, setLastName, setEmail, setPassword }) => {
  const [validationErrors] = useRecoilState(validationState);

  return (
    <div className="mt-3 mb-3 flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
          className="w-[50%] h-[50px] outline-none border-2 border-gray-200 focus:border-blue-500 rounded-md px-2 py-1"
        />
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
          className="flex-1 outline-none border-2 border-gray-200 focus:border-blue-500 rounded-md px-2 py-1"
        />
      </div>
      <input
        type="text"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-[50px] outline-none border-2 border-gray-200 focus:border-blue-500 rounded-md px-2 py-1"
      />
      {validationErrors.emailError && (
        <span className="text-red-500">{validationErrors.emailError}</span>
      )}
      <PasswordInput setPassword={setPassword} />
      {validationErrors.passwordError && (
        <span className="text-red-500">{validationErrors.passwordError}</span>
      )}
    </div>
  );
};

// PropTypes validation for InputForm
InputForm.propTypes = {
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

const Signup = () => {
  const [validationErrors, setValidationErrors] =
    useRecoilState(validationState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  // Centralized validation logic
  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    if (!email) {
      errors.emailError = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.emailError = "Invalid email address";
      isValid = false;
    }

    if (!password) {
      errors.passwordError = "Password is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Signup handler with error catching
  const handleSignup = async () => {
    if (validateInputs()) {
      try {
        await signup(email, password, firstName, lastName);
        navigate("/"); // Redirect to homepage on successful signup
      } catch {
        setValidationErrors((prev) => ({
          ...prev,
          passwordError: "Signup failed, please try again",
        }));
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-start pt-10">
      <h1 className="text-blue-600 font-bold text-5xl">ShareThoughts</h1>
      <div className="mt-5 w-[500px] flex flex-col bg-white rounded-lg shadow-2xl p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold">Create a new account</h2>
          <p className="text-gray-500 text-lg">It's quick and easy.</p>
        </div>
        <InputForm
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <div className="flex flex-col items-center gap-2">
          <button
            className="w-[200px] h-[50px] bg-green-600 text-white text-lg font-bold hover:bg-green-700 rounded-md"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 text-lg cursor-pointer"
          >
            Already have an account?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
