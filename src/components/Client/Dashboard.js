import React from "react";
import "../../assets/client/dashboard.scss";
import { MdOndemandVideo } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Loading from "../../img/loading-gif-png-5-original.gif";
import moment from "moment";

const Dashboard = ({
  initiate,
  waitingRoom,
  VideoReq,
  paginatedExams,
  handleClick,
  handleChange,
  handleClickLeft,
  handleClickRight,
  loading
}) => (
  <>
    <div className="main">
      <div className="videoApp" onClick={() => VideoReq()}>
        <span className="video">
          <MdOndemandVideo className="icon" />
        </span>
        <h2>Make a VIDEO APPOINTMENT</h2>
      </div>
      <div className="emailReq" onClick={() => initiate()}>
        <span className="email">
          <MdEmail className="icon" />
        </span>
        <h2>Request EMAIL CONSULTATION</h2>
      </div>
      <div className="waitRoom" onClick={() => waitingRoom()}>
        <span className="clock">
          <FaUserClock className="icon" />
        </span>
        <h2>Enter WAITING ROOM</h2>
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
              <th className="client-doctor">Doctor</th>
              <th className="client-subject">Subject</th>
              <th className="client-subject">Exam type</th>
              <th className="client-subject">Date</th>
              <th className="client-status">Status</th>
            </tr>
          </thead>

          {paginatedExams.map((exam, index) => {
            if (exam.status === "Canceled") return null;
            return (
              <tbody key={index} className="client-body">
                <tr
                  data-id={exam.id}
                  className="list-group"
                  onClick={() => handleClick(exam.id, exam.exam_type)}
                >
                  <td className="client-doctor">{exam.doctor}</td>
                  <td className="client-subject">{exam.subject}</td>
                  <td className="client-subject">{exam.exam_type}</td>

                  <td className="created">
                    {exam.created && !exam.appointed_date ? (
                      <p>
                        {" "}
                        Created: {moment(exam.created).format("MM/DD/YYYY")}
                      </p>
                    ) : (
                      <p>
                        {" "}
                        Appointed:{" "}
                        {moment(exam.appointed_date).format("MM/DD/YYYY")}
                      </p>
                    )}
                  </td>
                  <td className="client-status">
                    {exam.status === "Accepted" ||
                    exam.status === "Appointed" ? (
                      <FaCheck className="check" />
                    ) : exam.status === "Declined" ? (
                      <GiCancel className="declined" />
                    ) : (
                      <FaRegClock className="pendi" />
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    )}

    <div className="pagi">
      <div className="left" onClick={handleClickLeft}>
        <FaChevronLeft className="iconLeft" />
      </div>
      <div className="right" onClick={handleClickRight}>
        <FaChevronRight className="iconRight" />
      </div>
    </div>
  </>
);

export default Dashboard;
