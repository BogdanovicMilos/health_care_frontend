import React from "react";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";

const DProfile = ({ doctor }) => (
  <>
    <Header />
    <Nav />
    <ul className="nav nav-pills">
      <li className="disabled">
        <a href="#list">Profile</a>
      </li>
    </ul>
    {doctor &&
      doctor.map(doctor => {
        return (
          <div key={doctor.id} className="doctor" style={{ height: "180px" }}>
            <div className="rounded-pill">
              <div>
                <p>Doctor: {doctor.doctor}</p>
                <p>Speciality: {doctor.speciality}</p>
                <p>NPI: {doctor.npi_number}</p>
                <p>Prefix: {doctor.prefix}</p>
                <p>Description: {doctor.description}</p>
                <p>Price: {doctor.email_exam_price}</p>
              </div>
            </div>
          </div>
        );
      })}
  </>
);

export default DProfile;
