import React from "react";
import "../../assets/client/video_req.scss";
import Select from "react-select";
import CheckoutForm from "../../containers/Client/CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VideoReq = ({
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  handleDateChange,
  props
}) => {
  return (
    <div className="exam">
      <div className="mainExam">
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder="Select Speciality..."
            options={props.specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={props.specDoctor}
            onChange={handleDoctor}
            value={
              props.specDoctor.length === 0 ? null : [props.resetDoctorSelect]
            }
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject"
            value={props.subject}
            onChange={handleSubject}
          />
        </div>
      </div>
      <div className="DatePicker">
        <div className="exam-mes">
          <textarea
            type="text"
            className="form-control"
            id="exam-notes"
            placeholder="Enter notes"
            value={props.notes}
            onChange={handleMessage}
          />
        </div>
        <div className="MainDate">
          <DatePicker
            selected={props.startDate}
            onChange={handleDateChange}
            minDate={new Date()}
            inline
          />
        </div>
      </div>
      <input type="file" name="" id="" />
      <button value={props.submitted} className="btn" onClick={handleSubmit}>
        Send
      </button>
      <div>
        {props.isClicked ? (
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

export default VideoReq;
