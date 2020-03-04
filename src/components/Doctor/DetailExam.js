import React from 'react';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import '../../assets/detail_exam.scss';


const Detail = ({exam, status, handleStatus, statusValue, submitValue, handleSubmit, handleLink, handleLinkMessage}) => (
    
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Detail Exam</a></li>
        </ul>
        {exam.map(exam => {
            return (
                <div key={exam.id} className="detail-exam">
                    <div className="detail">   
                        <p>Client: {exam.client}</p>
                        <p>Speciality: {exam.speciality}</p>
                        {/* <p>Created: {new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                            }).format(new Date(exam.created))}
                        </p> */}
                        <p>Created:{exam.created}</p>
                        <p>Subject: {exam.subject}</p>
                        <p>Status: {exam.status}</p>
                        {!(exam.status === 'Accepted') &&
                        <div className="col-sm-10">    
                            <Select type="text" className="select-option" value={statusValue} options={status} onChange={handleStatus}/>
                            <button type="submit" className="btn btn-default" value={submitValue} onClick={handleSubmit}>Send</button>  
                        </div>
                        }
                        {(exam.status === 'Accepted') &&
                        <div className="message-btn">
                            <Link to="/doctor/exam/correspondence" className="messages-link" onClick={handleLink}>Message history</Link>
                            <Link to="/doctor/exam/message" className="message-link" onClick={handleLinkMessage}>Message</Link>
                        </div>
                        }
                    </div>
                </div>
            )})
        }
    </div>
);

export default Detail;