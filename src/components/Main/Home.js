import React from "react";
import "../../assets/main/main.scss";
// import { Pagination } from 'reactstrap';

const Home = ({ doctors, handleDoctor, handleConsultation, props }) => (
  <div className="row">
    <div className="headers">
      <div className="headersInfo">
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
          recusandae, totam deserunt minima numquam nemo provident ratione ipsam
          repellendus dolore.
        </p>
        <p>Our Team:</p>
        <div className="headersImages">
          <div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt="slika"
            />
            Dr. Rambo
          </div>
          <div>
            <img
              src="https://i.insider.com/589dbb873149a101788b4c85?width=1100&format=jpeg&auto=webp"
              alt=""
            />
            Dr. Fox
          </div>
          <div>
            <img
              src="https://www.ictshop.rs/wp-content/uploads/2017/03/People-Face-Happy-Smiling-Man-299488-300x225.jpg"
              alt=""
            />
            Dr. Mario
          </div>
        </div>
      </div>
      <img
        src="https://article.images.consumerreports.org/f_auto/prod/content/dam/cro/news_articles/health/CRO_Health_CROH_April_Online_Doctor_Chat_02-15"
        alt="slika"
      />
    </div>
    <div className="RowsClients">
      <h2>Thousands of satisfied clients</h2>
      <img
        src="https://www.famispa.com/wp-content/uploads/img/people.jpg"
        alt=""
      />
    </div>
    <div className="topSpecialities">
      <h2>Top Specialities</h2>
      <div className="spec">
        {props.specialities.map(spec => {
          return (
            <div key={spec.iD} className="eatchSpec">
              <div>
                <h3>{spec.label}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <div className="allDoctors">
      {doctors.map(obj => {
        return (
          <div key={obj.id} className="doctor-panel">
            <div className="doc-panel">
              <p>Doctor: {obj.doctor}</p>
              <p>Speciality: {obj.speciality}</p>
              <p>Price: {obj.price}</p>
            </div>
            <div className="doc-profile">
              <button
                className="btn btn-info"
                data-id={obj.id}
                onClick={() => handleDoctor(obj.id)}
              >
                View Profile
              </button>
            </div>
            <div className="doc-consultation">
              <button className="btn" onClick={handleConsultation}>
                Consultation
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Home;
