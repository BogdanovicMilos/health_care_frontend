import React from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
// import "../../assets/client/detail-exam.scss";
import moment from "moment";

const DetailVideo = ({ exam, handleLink, handleLinkMessage, handleCancel }) => (
  <>
    <Header />
    <Nav />
    {exam.map(exam => {
      console.log(exam);

      return (
        <div key={exam.id} className="detail-exam">
          <div className="detail">
            <p>Doctor: {exam.doctor}</p>
            <p>Speciality: {exam.speciality}</p>
            {exam.created ? (
              <p>
                {" "}
                Created:{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(new Date(exam.created))}
              </p>
            ) : (
              <p>
                {" "}
                Appointed: {moment(exam.appointed_date).format("MM/DD/YYYY")}
              </p>
            )}
            <p>Exam type: {exam.exam_type}</p>
            <p>Subject: {exam.subject}</p>
            <p>Message: {exam.message}</p>
            <p>Status: {exam.status}</p>
            {exam.status === "Appointed" || exam.status === "Accepted" ? (
              <div className="message-btn">
                <button className="messages-link" onClick={handleLink}>
                  Message history
                </button>
                <button className="message-link" onClick={handleLinkMessage}>
                  Message
                </button>
              </div>
            ) : (
              <button className="message-link" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </div>
      );
    })}
  </>
);

export default DetailVideo;
