import React from "react";
import "../../assets/dashboard.scss";
import { MdOndemandVideo } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Loading from "../../img/loading-gif-png-5-original.gif";
import moment from "moment";

const Dashboard = ({
  hnlClick,
  hnlClick2,
  hnlClick3,
  handleClick,
  handleChange,
  props,
  handleClickLeft,
  handleClickRight,
  hnlVideoClick,
  hnlWaitingClick,
  handleWaitingRoom,
  handleVideoPendingClick,
  loading
}) => {
  let short = props.pending ? props.pending.slice(0, 3) : null;
  let short2 = props.videoPending ? props.videoPending.slice(0, 3) : null;
  let short3 = props.waitingRoom ? props.waitingRoom.slice(0, 3) : null;

  return (
    <div className="testic">
      <div className="main">
        <div className="divVideo">
          <div className="videoApp1">
            <span className="video">
              <MdOndemandVideo className="icon" />
            </span>
            <h2>Video Request</h2>
          </div>
          <div style={{ height: "2px", background: "rgb(61, 61, 248)" }}></div>
          <div className="requestsVideo">
            {props.videoPending.length} new request to confirm
          </div>
          <div className="pendingReq">
            {short2.length !== 0 ? (
              short2.map(shorty => {
                return (
                  <div key={shorty.id}>
                    {shorty.client},{" "}
                    {moment(shorty.appointed_date).format("MM/DD/YYYY")}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
          <button onClick={hnlVideoClick}>SEE DETAILS</button>
        </div>
        <div className="divEmail">
          <div className="emailReq1">
            <span className="email">
              <MdEmail className="icon" />
            </span>
            <h2>Email Request</h2>
          </div>
          <div
            style={{ height: "2px", background: "rgb(137, 210, 235)" }}
          ></div>
          <div className="requestsEmail">
            {props.pending.length} new request to confirm
          </div>
          <div className="pendingReq">
            {short.length !== 0 ? (
              short.map(shorty => {
                return (
                  <div key={shorty.id}>
                    {shorty.client},{" "}
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit"
                    }).format(new Date(shorty.created))}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
          <button onClick={hnlClick}>SEE DETAILS</button>
        </div>
        <div className="divClock">
          <div className="waitRoom1">
            <span className="clock">
              <FaUserClock className="icon" />
            </span>
            <h2>Waiting Room</h2>
          </div>
          <div
            style={{ height: "2px", background: "rgb(107, 240, 107)" }}
          ></div>
          <div className="requestsClock">
            {props.waitingRoom.length} in waiting room
          </div>
          <div className="pendingReq">
            {short3.length !== 0 ? (
              short3.map(shorty => {
                return (
                  <div key={shorty.id}>
                    {shorty.client},{" "}
                    {/* {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit"
                    }).format(
                      Date(shorty.estimated_start / (1000 * 60 * 60 * 24))
                    )} */}
                    {moment(Date(shorty.estimated_start)).format("MM/DD/YYYY")}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
          <button onClick={hnlWaitingClick}>ENTER WAITING ROOM</button>
        </div>
      </div>
      {loading ? (
        <img src={Loading} alt="loading..." style={{ width: "150px" }} />
      ) : (
        <div className="mainTabel">
          <div className="mainConsultation">
            <div className="icon_left">
              <span>
                <MdDateRange className="icon1" />
              </span>
              <p>My Consultations</p>
            </div>
            <div className="sort">
              <label>Sort by: </label>
              <select name="" id="" onChange={handleChange}>
                <option value="latest">Latest</option>
                <option value="earliest">Earliest</option>
              </select>
            </div>
          </div>

          <table className="table2">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Client</th>
                <th className="client-subject">Subject</th>
                <th className="client-subject">Exam type</th>
                <th className="client-subject">Date</th>
                <th className="client-status">Status</th>
              </tr>
            </thead>
            {props.paginatedExams.map((exam, index) => {
              if (exam.status === "Accepted" || exam.status === "Appointed") {
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      onClick={() => handleClick(exam.id, exam.exam_type)}
                    >
                      <td className="client-doctor">{exam.client}</td>
                      <td className="client-subject">{exam.subject}</td>
                      <td className="client-subject">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p>
                            {" "}
                            Created: {moment(exam.created).format("MM/DD/YYYY")}
                          </p>
                        ) : exam.appointed_date ? (
                          <p>
                            {" "}
                            Appointed:{" "}
                            {moment(exam.appointed_date).format("MM/DD/YYYY")}
                          </p>
                        ) : null}
                      </td>
                      <td className="client-status">
                        <FaCheck className="check" />
                      </td>
                    </tr>
                  </tbody>
                );
              }
            })}
          </table>
        </div>
      )}

      {props.openPending ? (
        <div className="penTable">
          <table className="table2 test">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Client</th>
                <th className="client-subject">Subject</th>
                <th className="client-subject">Date</th>
                <th className="client-status">Status</th>
              </tr>
            </thead>
            {props.pending.map(pen => {
              return (
                <tbody key={pen.id} className="client-body">
                  <tr
                    data-id={pen.id}
                    className="list-group"
                    onClick={() => handleClick(pen.id)}
                  >
                    <td className="client-doctor">{pen.client}</td>
                    <td className="client-subject">{pen.subject}</td>
                    <td className="created">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                      }).format(new Date(pen.created))}
                    </td>
                    <td className="client-status">
                      <FaRegClock className="pendi" />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button onClick={hnlClick}>GO BACK</button>
        </div>
      ) : null}

      {props.openVideoPending ? (
        <div className="penTable">
          <table className="table2 test">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Client</th>
                <th className="client-subject">Subject</th>
                <th className="client-subject">Date</th>
                <th className="client-status">Status</th>
              </tr>
            </thead>
            {props.videoPending.map(pen => {
              return (
                <tbody key={pen.id} className="client-body">
                  <tr
                    data-id={pen.id}
                    className="list-group"
                    onClick={() => handleVideoPendingClick(pen.id)}
                  >
                    <td className="client-doctor">{pen.client}</td>
                    <td className="client-subject">{pen.subject}</td>
                    <td className="created">
                      {/* {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                      }).format(new Date(pen.created))} */}
                      {moment(pen.appointed_date).format("MM/DD/YYYY")}
                    </td>
                    <td className="client-status">
                      <FaRegClock className="pendi" />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button onClick={hnlClick2}>GO BACK</button>
        </div>
      ) : null}

      {props.openWaitingRoom ? (
        <div className="penTable">
          <table className="table2 test">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Client</th>
                <th className="client-subject">Subject</th>
                <th className="client-subject">Date</th>
                {/* <th className="client-status">Status</th> */}
              </tr>
            </thead>
            {props.waitingRoom.map(pen => {
              return (
                <tbody key={pen.id} className="client-body">
                  <tr
                    data-id={pen.id}
                    className="list-group"
                    onClick={() => handleWaitingRoom(pen.id)}
                  >
                    <td className="client-doctor">{pen.client}</td>
                    <td className="client-subject">{pen.subject}</td>
                    <td className="created">
                      {pen.created ? (
                        <p>
                          {" "}
                          Created: {moment(pen.created).format("MM/DD/YYYY")}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          Appointed:{" "}
                          {moment(pen.appointed_date).format("MM/DD/YYYY")}
                        </p>
                      )}
                    </td>
                    {/* <td className="client-status">
                      <FaRegClock className="pendi" />
                    </td> */}
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button onClick={hnlClick3}>GO BACK</button>
        </div>
      ) : null}
      <div className="pagi">
        <div className="left" onClick={handleClickLeft}>
          <FaChevronLeft className="iconLeft" />
        </div>
        <div className="right" onClick={handleClickRight}>
          <FaChevronRight className="iconRight" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
