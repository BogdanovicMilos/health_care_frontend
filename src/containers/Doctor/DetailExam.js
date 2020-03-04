import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Detail from '../../components/Doctor/DetailExam';

const options = [
    { value: 'Accept', label: 'Accept' },
    { value: 'Decline', label: 'Decline' },
];

class DetailExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exam: [],
            statusValue: '',
            selectedStatus: '',
            token: sessionStorage.getItem('accessToken')
        } 
    }

    detail = () => {
        const access_token = 'Bearer '.concat(this.state.token)
        axios.get(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/`, { headers: { Authorization: access_token }})
          .then(response => {
              console.log(response)
            this.setState({exam: Object.values(response.data.data)})
          })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.doctorExam();
    }

    handleLink = () => {
        this.props.history.push("/doctor/exam/correspondence")
    }

    handleLinkMessage = () => {
        this.props.history.push("/doctor/exam/message")
    }

    handleStatus = statusValue => {
        this.setState({statusValue})
        let {value, label} = statusValue;
        console.log(value, label);
        this.setState({selectedStatus: value});
    }

    doctorExam = async () => {    
        const access_token = 'Bearer '.concat(this.state.token)
        const client = await fetch(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            },
            body: JSON.stringify({
                state: this.state.selectedStatus,
            })
        });
        const jsonData = await client.json();
        return jsonData;
    }

    componentDidMount() {
        this.detail()
    }

    render() {
        return (
            <div className="container">
                <Detail 
                    exam={this.state.exam} 
                    status={options} 
                    handleStatus={this.handleStatus}
                    submitValue={this.state.submitValue}
                    handleSubmit={this.handleSubmit}
                    handleLink={this.handleLink}
                    handleLinkMessage={this.handleLinkMessage}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const examID = state.getIn(['examReducer', 'examID']);
    return {
        examID,
    }
  }

export default connect(mapStateToProps)(DetailExam);