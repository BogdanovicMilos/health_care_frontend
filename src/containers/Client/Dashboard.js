import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import { examID } from '../../actions/examActions';
import Dashboard from '../../components/Client/Dashboard';


class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            token: sessionStorage.getItem('accessToken'),
            response: null
        } 
    }

    initiate = () => {
        this.props.history.push('/initiate');
    }

    connect = () => {
        var ws = new WebSocket("ws://127.0.0.1:8000/ws/exam/status/");
        let that = this;
        var connectInterval;
        
        ws.onopen = () => {
          // on connecting, do nothing but log it to the console
          console.log("connected");
          this.setState({ ws: ws });
        };

        ws.onmessage = e => {
          // listen to data sent from the websocket server
          this.exams();
          const message = JSON.parse(e.data);
          this.state.exams.map((exam) => {
              if(exam.exam === message.id){
                  var state = message.status
                  let new_exam = Object.assign({...exam}, exam);
                  new_exam.status = state;
                  return { new_exam };
                  
              }else{
                  console.log('Does not exist.')
              }
          })
        }

        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //c
          // automatically try to reconnect on connection loss
        };

        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );
            ws.close();
        };
    }

    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    componentDidMount() {
        this.connect();
        this.exams();  
    }

    exams = () => {
        const access_token = 'Bearer '.concat(this.state.token)
        axios.get('http://0.0.0.0:8000/api/client/exams/', { headers: { Authorization: access_token }})
          .then(response => {
            const res = response.data.results.map((val) => {
              return {exam: val.id, doctor: val.doctor, subject: val.subject, status: val.status}
            });
            this.setState({exams: res})
        })
    }

    handleClick = (e) => {
        this.props.dispatch(examID(e.currentTarget.dataset.id))
        this.props.history.push("/client/exam/detail")
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <Dashboard 
                    initiate={this.initiate}
                    exams={this.state.exams}
                    handleClick={this.handleClick}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      exam: state.exam
    }
  }

export default connect(mapStateToProps)(ClientDashboard);
