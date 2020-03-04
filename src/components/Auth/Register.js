import React from "react";
import Select from "react-select";
import "../../assets/auth/register.scss";

const RegisterUser = ({
  userType,
  emailValue,
  firstNameValue,
  lastNameValue,
  passwordValue,
  addressValue,
  birthDateValue,
  npiNumValue,
  prefixValue,
  genderOptions,
  genderValue,
  specOptions,
  specValue,
  submitValue,
  handleEmail,
  handleFirstName,
  handleLastName,
  handlePass,
  handleGender,
  handleAddress,
  handleBirthDate,
  handleNpiNum,
  handlePrefix,
  handleSpec,
  handleSubmit
}) => {
  return (
    <form className="register-form">
      <div className="reg-email">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={emailValue}
          onChange={handleEmail}
        />
      </div>
      <div className="reg-name">
        <input
          type="text"
          className="form-control"
          id="firstname"
          placeholder="Enter first name"
          value={firstNameValue}
          onChange={handleFirstName}
        />
      </div>
      <div className="reg-surname">
        <input
          type="text"
          className="form-control"
          id="lastname"
          placeholder="Enter last name"
          value={lastNameValue}
          onChange={handleLastName}
        />
      </div>
      <div className="reg-pass">
        <input
          type="password"
          className="form-control"
          id="pwd"
          placeholder="Enter password"
          value={passwordValue}
          onChange={handlePass}
        />
      </div>
      {userType === "client" && (
        <div>
          <div className="gender">
            <Select
              type="text"
              id="gender"
              value={genderValue}
              options={genderOptions}
              onChange={handleGender}
            />
          </div>
          <div className="address">
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter address"
              value={addressValue}
              onChange={handleAddress}
            />
          </div>
          <div className="date">
            <input
              type="date"
              className="form-control"
              id="birthdate"
              placeholder="Enter birth date"
              value={birthDateValue}
              onChange={handleBirthDate}
            />
          </div>
        </div>
      )}
      {userType === "doctor" && (
        <div>
          <div className="npi">
            <input
              type="text"
              pattern="[0-9]*"
              className="form-control"
              id="npi"
              placeholder="Enter NPI number"
              value={npiNumValue}
              onChange={handleNpiNum}
            />
          </div>
          <div className="prefix">
            <input
              type="text"
              className="form-control"
              id="prefix"
              placeholder="Enter prefix"
              value={prefixValue}
              onChange={handlePrefix}
            />
          </div>
          <div className="spec">
            <Select
              type="text"
              id="speciality"
              value={specValue}
              options={specOptions}
              onChange={handleSpec}
            />
          </div>
        </div>
      )}
      <div className="register-button">
        <button
          type="submit"
          className="btn"
          value={submitValue}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegisterUser;
