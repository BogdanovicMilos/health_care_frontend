import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import '../../assets/client/exam-form.scss';

const InitiateExam = ({specialities, filtered, subject, submitted, message, handleSpeciality, handleDoctor, handleSubject, handleSubmit, handleMessage}) => (
    <div className="exam">
        <div className="exam-spec"> 
            <Select type="text" id="speciality" placeholder="Select Speciality..." options={specialities} onChange={handleSpeciality}/>
        </div>
        <div className="exam-doc"> 
            <Select type="text" id="doctor" placeholder="Select Doctor..." options={filtered} onChange={handleDoctor}/>
        </div>
        <div className="exam-sub"> 
            <input type="text" className="form-control" id="subject" placeholder="Enter subject" value={subject} onChange={handleSubject}/>
        </div>
        <div className="exam-mess"> 
            <textarea type="text" className="form-control" id="exam-message" placeholder="Enter message" value={message} onChange={handleMessage}/>
        </div>
        <div className="btn btn-warning">
            <Link value={submitted} to="/checkout" className="submit-link" onClick={handleSubmit}>Submit Exam</Link>
        </div>      
    </div>
);

export default InitiateExam;