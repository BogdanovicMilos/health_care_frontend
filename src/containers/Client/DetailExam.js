import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Detail from '../../components/Client/DetailExam';
import { price } from '../../actions/examActions';


class ClientDetailExam extends Component {
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
        axios.get(`http://127.0.0.1:8000/api/client/exams/${this.props.examID}/`, { headers: { Authorization: access_token }})
          .then(response => {
            this.setState({exam: Object.values(response.data)})
          })
    }

    handleLink = () => {
        this.props.history.push("/client/exam/correspondence")
    }

    handleLinkMessage = () => {
        this.props.history.push("/client/exam/message")
    }

    handleCancel = async () => {
        const access_token = 'Bearer '.concat(this.state.token)
        const doctor = await fetch(`http://127.0.0.1:8000/api/client/exams/${this.props.examID}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            },
            body: JSON.stringify({
                message: 'Cancel'
            })
        });
        const jsonData = await doctor.json();
        // this.toRefund();
        return jsonData;
    }

    toRefund = async () => {
        return this.props.history.push('/refund')
    }

    componentDidMount() {
        this.detail()
    }

    render() {
        const e = this.state.exam
        e.map(e => {
            console.log(e.price)
            this.props.dispatch(price(e.price))
        })
        return (
            <div className="container">
                <Detail 
                    exam={this.state.exam} 
                    handleLink={this.handleLink}
                    handleLinkMessage={this.handleLinkMessage}
                    handleCancel={this.handleCancel}
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

export default connect(mapStateToProps)(ClientDetailExam);