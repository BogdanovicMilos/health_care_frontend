import React from 'react';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import { Link } from 'react-router-dom';
import '../../assets/client/detail-exam.scss';
import { Button } from 'reactstrap';


const Detail = ({exam, handleLink, handleLinkMessage, handleCancel}) => (
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
                        <p>Doctor: {exam.doctor}</p>
                        <p>Speciality: {exam.speciality}</p>
                        <p className="created">Date: {new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                            }).format(new Date(exam.created))}
                        </p>
                        <p>Price: {exam.price}</p>
                        <p>Subject: {exam.subject}</p>
                        <p>Status: {exam.status}</p>
                        {(exam.status === 'Accepted' || exam.status === 'Pending') &&
                        <div className="message-btn">
                            <Link to="/client/exam/correspondence" className="messages-link" onClick={handleLink}>Message history</Link>
                            <Link to="/client/exam/message" className="message-link" onClick={handleLinkMessage}>Message</Link>
                            <Button className="b" onClick={handleCancel}>Cancel</Button>
                        </div>
                        }
                    </div>
                </div>

            )})
        }
    </div>
);

export default Detail;