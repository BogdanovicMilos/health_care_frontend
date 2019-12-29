import React, {Component} from 'react';
import Header from '../../components/Main/Header';
import InitiateExam from '../../components/Client/ExamForm';
import Nav from '../../components/Main/Navbar';
import axios from 'axios';
import { connect } from 'react-redux';
import { doctor } from '../../actions/examActions';


class ExamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      specialities: [],
      doctors: [],
      filtered: [],
      subject: '',
      submitted: false,
      price: null,
      doctor_id: null
    };
  }

  handleSpeciality = (e) => {
    console.log(e);
    
    const filteredDoctors = this.state.doctors.filter((doctor) => doctor.spec === e.label);
    this.setState({
      specialities: e.value,
      doctors: filteredDoctors,
    });
  }

  handleDoctor = (e) => {
    console.log('...', e);
    this.setState({doctors: e.value})
    this.setState({doctor_id: e.iD})
    this.props.dispatch(doctor(e))
  }

  handleSubject = (e) => {
    this.setState({subject: e.target.value});
  }

  handleSubmit = async () => {
    const clientID = sessionStorage.getItem('iD')
    const response = await fetch('http://0.0.0.0:8000/api/client/initiate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client: parseInt(clientID),
          speciality: this.state.specialities,
          doctor: this.state.doctor_id,
          subject: this.state.subject
        })
      }
    );
    const data = await response.json()
    console.log(data)
    return this.props.history.push('/checkout')
  }

  componentDidMount() {
    axios.get('http://0.0.0.0:8000/api/specialities/')
      .then(response => {
        console.log(response.data);
        const res = response.data.message.map((val) => {
          return {value: val.id, iD: val.speciality_id, label: val.name}
        });
        console.log(res);
        this.setState({specialities: res });
      })
    axios.get('http://0.0.0.0:8000/api/doctor/list')
      .then(response => {
        const res = response.data.message.map((val) => {
          return {value: val.id, iD: val.doctor_id, label: val.doctor, spec: val.speciality, price: val.price}
        });
        this.setState({ doctors: res });
      })
  }

  render() {
    if (this.state.complete) return <h1>Submit Completed</h1>;
    return (
      <div className="container">
        <Header />
        <Nav />
        <InitiateExam
          specialities={this.state.specialities}
          doctors={this.state.doctors}
          subject={this.state.subject}
          submitted={this.state.submitted}
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          handleSubject={this.handleSubject}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const doctor = state.getIn(['doctorReducer', 'doctor']);
  console.log(doctor)
  return {
    doctor,
    price: state.price
  }
}

export default connect(mapStateToProps)(ExamForm);