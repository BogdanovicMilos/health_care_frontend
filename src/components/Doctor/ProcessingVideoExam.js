import React from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/processingWaitingRoom.scss";
import moment from "moment";

const Processing = ({ exam, handleConnect, connected, handleVideoStart }) => (
  <>
    <Header />
    <Nav />

    {exam.map(exam => {
      return (
        <div key={exam.exam.id} className="detail-exam">
          <div className="detail">
            <p>Client: {exam.exam.client}</p>
            <p>Speciality: {exam.exam.speciality}</p>
            <p>Date: {moment(exam.exam.appointed_date).format("MM/DD/YYYY")}</p>
            <p>Subject: {exam.exam.subject}</p>
            <p>Notes: {exam.exam.notes}</p>
            <p>Status: {exam.exam.status}</p>
            <div>
              {!connected ? (
                <button type="submit" className="btn" onClick={handleConnect}>
                  Connect
                </button>
              ) : (
                <button
                  id="DoctorStartVideo"
                  type="submit"
                  className="btn"
                  onClick={handleVideoStart}
                >
                  Start Video
                </button>
              )}
            </div>
          </div>
          <div key={exam.record.id} className="record-box">
            <h4>Record</h4>
            <p>Allergies: {exam.record.allergies}</p>
            <p>Teraphy history: {exam.record.teraphy_history}</p>
            <p>Medical conditions: {exam.record.medical_conditions}</p>
          </div>
        </div>
      );
    })}
    {exam.map(exam => {
      console.log(exam, 'not');
      console.log(exam.record, 'record');
      
      
      let filtered = exam.record.report.filter(filexam => {
        return filexam.spec_name === exam.exam.speciality;
      });
      console.log(filtered, 'filt');
      return (
        <div key={filtered[0].id} className="report">
          <div className="report-details">
            <h4>Report</h4>
            <p>Doctor: {filtered[0].name}</p>
            <p>Speciality: {filtered[0].spec_name}</p>
            <p>Diagnose: {filtered[0].diagnose}</p>
            <p>Report: {filtered[0].report}</p>
            <p>Tests: {filtered[0].tests}</p>
            <p>Medication Name: {filtered[0].medication_name}</p>
            <p>
              Medication Prescribing Date:{" "}
              {filtered[0].medication_prescribing_date}
            </p>
            <p>Medication Notes: {filtered[0].medication_notes}</p>
          </div>
        </div>
      );
    })}
    <div id="videoo"></div>
  </>
);
// {
//   /* <>
// //         <label>Your Id:</label>
// //         <br />
// //         <textarea id="yourId"></textarea>
// //         <br />
// //         <label>Other Id:</label>
// //         <br />
// //         <textarea id="otherId"></textarea>
// //         <br />
// //         <button id="connect">Connect</button>
// //         <hr />
// //         <label>Enter Message:</label>
// //         <br />
// //         <textarea id="yourMessage"></textarea>
// //         <br />
// //         <button id="send">Send</button>
// //         <pre id="messages"></pre>
// //         <button>Start video</button>
// //       </> */
// }

export default Processing;
