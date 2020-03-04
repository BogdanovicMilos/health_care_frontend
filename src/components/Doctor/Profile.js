import React from "react";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import "../../assets/doctor_profile.scss";
import Select from "react-select";

const Profile = ({
  doctor,
  prefixValue,
  descriptionValue,
  priceValue,
  priceWebValue,
  submitValue,
  handlePrefix,
  handleDescription,
  handlePrice,
  handleWebPrice,
  handleSubmit,
  handleSelect,
  status,
  selectValue
}) => {
  return (
    <>
      <Header />
      <Nav />
      {doctor &&
        doctor.map(doctor => {
          return (
            <div
              className="mainprof"
              style={{
                margin: "20px auto",
                display: "flex",
                flexDirection: "column"
              }}
              key={doctor.id}
            >
              <div className="doctor">
                <div className="imginput">
                  <div className="doctor-p">
                    <p></p>
                  </div>
                  <input type="file" name="picture" id="" />
                </div>
                <div className="info">
                  <p>Doctor: {doctor.doctor}</p>
                  <p>Email: {doctor.email}</p>
                  <p>Speciality: {doctor.speciality}</p>
                  <p>NPI: {doctor.npi_number}</p>
                  <p>Prefix: {doctor.prefix}</p>
                  <p>Description: {doctor.description}</p>
                  <p>Email exam price: {doctor.email_exam_price} €</p>
                  <p>Web exam price: {doctor.web_exam_price} €</p>
                  <p>Availability: {doctor.status}</p>
                </div>
              </div>
              <form className="form">
                <div className="pref-price">
                  <div className="prefix">
                    <input
                      type="text"
                      className="prefix-input"
                      placeholder="Enter prefix"
                      value={prefixValue}
                      onChange={handlePrefix}
                    />
                  </div>
                  <div className="select" style={{ width: "200px" }}>
                    <Select
                      style={{ background: "black" }}
                      type="text"
                      className="select-option"
                      value={selectValue}
                      options={status}
                      onChange={handleSelect}
                    />
                  </div>
                  <div className="price">
                    <input
                      type="text"
                      className="price-input"
                      placeholder="Enter mail price"
                      value={priceValue}
                      onChange={handlePrice}
                    />
                  </div>
                  <div className="price">
                    <input
                      type="text"
                      className="price-input"
                      placeholder="Enter web price"
                      value={priceWebValue}
                      onChange={handleWebPrice}
                    />
                  </div>
                </div>
                <div className="description">
                  <textarea
                    type="text"
                    className="description-input"
                    placeholder="Enter description"
                    value={descriptionValue}
                    onChange={handleDescription}
                  />
                </div>

                <div className="submit">
                  <button
                    type="submit"
                    className="btn"
                    value={submitValue}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          );
        })}
    </>
  );
};

export default Profile;
