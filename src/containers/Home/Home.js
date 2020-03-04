import React, { Component } from 'react';
import axios from 'axios';
import Home from '../../components/Main/Home';
import {doctor} from '../../actions/examActions';
import { connect } from 'react-redux';
import Header from '../../components/Main/Header';
import Footer from '../../components/Main/Footer';
import Nav from '../../components/Main/Navbar';

const token = sessionStorage.getItem('accessToken')
const access_token = 'Bearer '.concat(token)

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          doctors: [],
        };
    }

    handleDoctor = (e) => {
      let doctorID = e.currentTarget.dataset.id
      this.props.dispatch(doctor(doctorID))
      this.props.history.push(`/doctor/profile/${doctorID}`)
    }

    handleConsultation = (e) => {
      let doctorID = e.currentTarget.dataset.id
      this.props.dispatch(doctor(doctorID))
      this.props.history.push("/initiate")
    }

    handleDashboardDoctor = () => {
      this.props.history.push("/dashboard-doctor")
    }

    handleDashboardClient = () => {
      this.props.history.push("/dashboard-client")
    }

    componentDidMount() {
        axios.get('http://0.0.0.0:8000/api/doctor/list', { headers: { Authorization: access_token }})
          .then(response => {
            console.log(response)
            const res = response.data.data.map((val) => {
              return {id: val.id, doctor: val.doctor, speciality: val.speciality, price: val.price}
            });
            this.setState({ doctors: res });
          })
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <Home doctors={this.state.doctors} handleDoctor={this.handleDoctor} handleConsultation={this.handleConsultation} />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    doctor: state.doctor
  }
}

export default connect(mapStateToProps)(Main);
