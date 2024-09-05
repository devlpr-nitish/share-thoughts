import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="signup-container container">
        <div className="input-fields">
          <span>First Name</span>
          <input type="text" />
          <span>Last Name</span>
          <input type="text" />
          <span>Email </span>
          <input type="email" />
          <span>Password</span>
          <input type="password" />
          <span>Confirm Password</span>
          <input type="password" />
        </div>
        <Link to="/signin">Already have an account? Signin</Link>
        <button>Sign Up</button>
      </div>
    </>
  );
};

export default SignUp;
