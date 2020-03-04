import React from "react";
import "../../assets/record.scss";

const Record = ({
  record,
  props,
  handleReport,
  handleTests,
  handleDiagnose,
  handlePrescribtionDate,
  handleMedicationName,
  handleMedicationNotes,
  submitValue,
  handleSubmit
}) => (
  <div className="row">
    <div className="box">
      {record ? (
        record.map(data => {
          // console.log(data);

          return (
            <div key={data.id} className="record-box">
              <p>Client: {data.client}</p>
              <p>Allergies: {data.allergies}</p>
              <p>Teraphy history: {data.teraphy_history}</p>
              <p>Medical conditions: {data.medical_conditions}</p>
              {/* <p>Doctor: {props.curentDoc}</p>
              <p>Speciality: {props.speciality}</p>
              <p>Diagnose: {data.diagnose}</p>
              <p>Report: {data.report}</p>
              <p>Tests: {data.tests}</p>
              <p>Medication Name: {data.medicationName}</p>
              <p>Medication Prescribing Date: {data.prescribingDate}</p>
              <p>Medication Notes: {data.medicationNotes}</p> */}
            </div>
          );
        })
      ) : (
        <p style={{ margin: "30px auto", color: "rgb(0, 191, 255)" }}>
          No Records
        </p>
      )}
    </div>
    <div className="r-form">
      <div className="details">
        <input
          type="text"
          className="d-details"
          placeholder="Enter Report"
          value={props.report}
          onChange={handleReport}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="text"
          className="d-teraphy"
          placeholder="Enter Tests"
          value={props.tests}
          onChange={handleTests}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="text"
          className="d-teraphy"
          placeholder="Enter Medication Name"
          value={props.medicationName}
          onChange={handleMedicationName}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="text"
          className="d-teraphy"
          placeholder="Enter Medication Notes"
          value={props.medicationNotes}
          onChange={handleMedicationNotes}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="date"
          className="d-teraphy"
          placeholder="Enter Prescription Date"
          value={props.prescribingDate}
          onChange={handlePrescribtionDate}
        />
      </div>
      <div className="medical-con">
        <input
          type="text"
          className="d-medical"
          placeholder="Enter Diagnose"
          value={props.diagnose}
          onChange={handleDiagnose}
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

export default Record;
