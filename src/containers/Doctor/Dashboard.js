import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Dashboard from '../../components/Doctor/Dashboard';
import { examID } from '../../actions/examActions';
import { clientID } from '../../actions/clientActions';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';


class DoctorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            clients: [],
            record: [],
            token: sessionStorage.getItem('accessToken')
        } 
    }

    exams = () => {
        const access_token = 'Bearer '.concat(this.state.token)
        axios.get('http://127.0.0.1:8000/api/doctor/exams/', { headers: { Authorization: access_token }})
          .then(response => {
            console.log(response, 'resssss')
            const res = response.data.results.map((val) => {
              return {exam: val.id, client: val.client, created: val.created, subject: val.subject, status: val.status}
            });
            console.log(res, 'e')
            this.setState({exams: res})
        })
    }

    // clients = () => {
    //     const access_token = 'Bearer '.concat(this.state.token)
    //     axios.get('http://0.0.0.0:8000/api/doctor/clients/', { headers: { Authorization: access_token }})
    //     .then(response => {
    //       console.log(response)
    //       const res = response.data.results.map((val) => {
    //         return {id: val.client_id, client: val.client}
    //       });
    //       console.log(res, 'res')
    //       this.setState({clients: res}) 
    //     })
    // }

    handleClick = (e) => {
        this.props.dispatch(examID(e.currentTarget.dataset.id))
        this.props.history.push("/doctor/exam/detail")
    }

    handleClient = (e) => {
        this.props.dispatch(clientID(e.currentTarget.dataset.id))
        this.props.history.push("/doctor/record/detail")
    }

    componentDidMount() {
        this.exams()
        // this.clients()
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <Dashboard exams={this.state.exams} clients={this.state.clients} handleClick={this.handleClick} handleClient={this.handleClient}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      exam: state.exam,
    }
  }
  
export default connect(mapStateToProps)(DoctorDashboard);