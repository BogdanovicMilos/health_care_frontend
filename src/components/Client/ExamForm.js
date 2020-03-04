import React from "react";
import Select from "react-select";
import "../../assets/client/exam-form.scss";
import CheckoutForm from "../../containers/Client/CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";

const InitiateExam = ({
  specialities,
  subject,
  submitted,
  message,
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  specDoctor,
  resetDoctorSelect,
  isClicked
}) => {
  return (
    <div className="exam">
      <div className="mainExam">
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder="Select Speciality..."
            options={specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={specDoctor}
            onChange={handleDoctor}
            value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={handleSubject}
          />
        </div>
      </div>
      <div className="exam-mess">
        <textarea
          type="text"
          className="form-control"
          id="exam-message"
          placeholder="Enter message"
          value={message}
          onChange={handleMessage}
        />
      </div>
      {/* <div className="btn"> */}
      <button value={submitted} className="btn" onClick={handleSubmit}>
        Submit Exam
      </button>
      {/* </div> */}
      <div>
        {isClicked ? (
          <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        ) : null}
      </div>
    </div>
  );
};

export default InitiateExam;
