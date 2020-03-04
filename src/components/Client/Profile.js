import React from "react";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
// import SideNavbar from '../../containers/Home/SideNav';
import "../../assets/client/profile.scss";

const Profile = ({
  client,
  addressValue,
  handleAddress,
  submitValue,
  handleSubmit
}) => (
  <>
    <Header />
    <Nav />

    {client &&
      client.map(client => {
        return (
          <div key={client.id} className="mainClien">
            <div className="client">
              <div className="client-p">
                <p>Name: {client.user}</p>
                <p>Address: {client.address}</p>
                <p>Gender: {client.gender}</p>
                <p>Birth Date: {client.birth_date}</p>
              </div>
            </div>
            <div className="form">
              <div className="address">
                Change address:{" "}
                <input
                  type="text"
                  className="address-input"
                  placeholder="Enter address"
                  value={addressValue}
                  onChange={handleAddress}
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
            </div>
          </div>
        );
      })}
  </>
);

export default Profile;
