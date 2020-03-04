import React from "react";
import "../../assets/client/waitingRoom.scss";
import Select from "react-select";
import CheckoutForm from "../../containers/Client/CheckoutForm";
// import { Elements, StripeProvider } from "react-stripe-elements";

const WaitingRoom = ({
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  handleExitQueue,
  props
}) => {
  const disabled = props.credits ? false : true;
  const disabled2 = props.credits ? true : false;
  const disabled3 = props.YourNumber !== 0 ? true : false;
  return (
    <div className="exam">
      <div className="mainExam">
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder="Select Speciality..."
            options={props.specialities}
            isDisabled={disabled2}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={props.specDoctor}
            isDisabled={disabled2}
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
      <div className="queue">
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
        <div className="queueInfo">
          <h5>Queue (online)</h5>
          <div className="queueMain">
            <div className="statusQueue">
              <p>Queue status</p>
              <div>
                {props.credits && props.YourNumber === 0 ? (
                  <h4
                    style={{
                      background: "rgb(250, 250, 102)",
                      color: "rgb(128, 128, 3)",
                      borderRadius: "5px"
                    }}
                  >
                    Be Ready
                  </h4>
                ) : props.credits ? (
                  <h4
                    style={{
                      background: "rgb(119, 228, 119)",
                      color: "green",
                      borderRadius: "5px"
                    }}
                  >
                    In the queue
                  </h4>
                ) : (
                  <h4>Out of queue</h4>
                )}
              </div>
            </div>
            <div className="timeEst">
              <p>People before you</p>
              <div>
                <p>Num</p>
                <h4>
                  {!props.credits
                    ? props.peopleInQueue.length
                    : props.YourNumber}
                </h4>
              </div>
            </div>
          </div>
          {props.YourNumber === 0 ? (
            <p>Be ready, Waiting from Doctors connection...</p>
          ) : null}
          <button id="StartVideo" disabled={disabled3}>
            Start video
          </button>
          <button
            className="exitQueue"
            onClick={handleExitQueue}
            disabled={disabled}
          >
            Exit the queue
          </button>
        </div>
      </div>
      <input type="file" name="" id="" />
      <button
        value={props.submitted}
        disabled={disabled2}
        className="btn"
        onClick={handleSubmit}
      >
        Enter the queue
      </button>
      <div>
        {/* {props.isClicked ? (
          <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        ) : null} */}
      </div>
      {/* <>
//         <label>Your Id:</label>
//         <br />
//         <textarea id="yourId"></textarea>
//         <br />
//         <label>Other Id:</label>
//         <br />
//         <textarea id="otherId"></textarea>
//         <br />
//         <button id="connect">Connect</button>
//         <hr />
//         <label>Enter Message:</label>
//         <br />
//         <textarea id="yourMessage"></textarea>
//         <br />
//         <button id="send">Send</button>
//         <pre id="messages"></pre>
//         <button>Start video</button>
//       </> */}
    </div>
  );
};

export default WaitingRoom;
