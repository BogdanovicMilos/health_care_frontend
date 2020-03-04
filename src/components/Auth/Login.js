import React from "react";
import "../../assets/auth/login.scss";

const LoginUser = ({
  emailValue,
  passwordValue,
  submitted,
  handleEmail,
  handlePassword,
  handleSubmit
}) => {
  return (
    <div className="mainLogin">
      <form className="login-form">
        <div className="email">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={emailValue}
            onChange={handleEmail}
          />
        </div>
        <div className="password">
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            value={passwordValue}
            onChange={handlePassword}
          />
        </div>
        <div className="login-button">
          <button
            type="submit"
            className="btn"
            value={submitted}
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
