import React from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Select from "react-select";
import "../../assets/detail_exam.scss";

const Detail = ({
  exam,
  status,
  handleStatus,
  statusValue,
  submitValue,
  handleSubmit,
  handleLink,
  handleLinkMessage
}) => (
  <>
    <Header />
    <Nav />

    {exam.map(exam => {
      return (
        <div key={exam.id} className="detail-exam">
          <div className="detail">
            <p>Client: {exam.client}</p>
            <p>Speciality: {exam.speciality}</p>
            <p>
              Created:{" "}
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(new Date(exam.created))}
            </p>
            <p>Subject: {exam.subject}</p>
            <p>Message: {exam.message}</p>
            <p>Status: {exam.status}</p>
            {!(exam.status === "Accepted") && (
              <div style={{ display: "flex" }}>
                <Select
                  type="text"
                  className="select-option"
                  value={statusValue}
                  options={status}
                  onChange={handleStatus}
                />
                <button
                  type="submit"
                  className="btn"
                  value={submitValue}
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            )}
            {exam.status === "Accepted" && (
              <div className="message-btn">
                <button className="messages-link" onClick={handleLink}>
                  Message history
                </button>
                <button className="message-link" onClick={handleLinkMessage}>
                  Message
                </button>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </>
);

export default Detail;
