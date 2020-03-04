import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import WaitingRoom from "../../components/Client/WaitingRoom";
import { connect } from "react-redux";
import { doctor } from "../../actions/examActions";
import { NotificationManager } from "react-notifications";
import moment from "moment";

class ClientWaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialities: [],
      doctors: [],
      subject: "",
      notes: "",
      submitted: false,
      price: null,
      doctor_id: null,
      client_id: "",
      doctorsStatus: "",
      token: sessionStorage.getItem("accessToken"),
      specDoctor: [],
      specialSP: [],
      resetDoctorSelect: null,
      isClicked: false,
      credits: false,
      attachment: null,
      currentClient: "",
      peopleInQueue: [],
      YourNumber: null,
      yourId: "",
      hisId: ""
    };
  }

  handleSpeciality = e => {
    let filteredDoctors = this.state.doctors.filter(
      doctor => doctor.spec === e.label
    );

    this.setState({
      specialSP: e.value,
      specDoctor: filteredDoctors,
      resetDoctorSelect: null
    });
  };

  handleDoctor = e => {
    this.props.dispatch(doctor(e));
    this.setState({
      doctor_id: e.iD,
      doctorsStatus: e.status,
      resetDoctorSelect: e
    });

    if (e.status !== "Available") {
      NotificationManager.warning(
        `Doctor is not Available at the moment`,
        "Warning!",
        4000
      );
    }
    this.QueueList(e.iD);
  };

  handleSubject = e => {
    this.setState({ subject: e.target.value });
  };

  handleMessage = e => {
    this.setState({ notes: e.target.value });
  };

  handleExitQueue = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    return axios
      .delete(
        `https://health-care-backend.herokuapp.com/api/queue/client/delete/${this.state.currentClient.id}/`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(res => {
        this.setState({ credits: false, peopleInQueue: [] });
      });
  };

  hanldeClientQueue = async id => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://health-care-backend.herokuapp.com/api/queue/client/${id}/`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        console.log(response, "Client, IDDDDDDDD");

        if (response.statusText !== "OK") {
          console.log("empty");
        } else {
          if (
            response.data.data.created !==
            moment(new Date()).format("YYYY-MM-DD")
          ) {
            this.setState({ currentClient: response.data.data });
            this.handleExitQueue();
          } else if (response.data.data.status === "In the queue") {
            this.setState({
              credits: true,
              currentClient: response.data.data
            });
          }
          this.QueueList(response.data.data.doctor);
        }
      });
  };

  handleSubmit = async e => {
    const access_token = "Bearer ".concat(this.state.token);
    if (
      this.state.specialSP &&
      this.state.doctor_id &&
      this.state.subject &&
      this.state.notes &&
      this.state.doctorsStatus === "Available"
    ) {
      this.setState({ isClicked: true });
      const response = await fetch(
        "https://health-care-backend.herokuapp.com/api/queue/enter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token
          },
          body: JSON.stringify({
            client: this.state.client_id,
            speciality: this.state.specialSP,
            doctor: this.state.doctor_id,
            subject: this.state.subject,
            notes: this.state.notes,
            attachments: this.state.attachment
          })
        }
      );
      const data = await response.json();
      this.hanldeClientQueue(this.state.client_id);
      this.props.history.push("/dashboard-client");
      // this.toCheckout();

      return data;
    } else if (this.state.doctorsStatus !== "Available") {
      NotificationManager.error(
        `Doctor is not Available at the moment`,
        "Failed!",
        4000
      );
    } else {
      NotificationManager.error("Empty Fields", "Failed!", 2000);
    }
  };

  // toCheckout = async () => {
  //   return this.props.history.push("/checkout");
  // };

  handleClientProfile = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/client/profile/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        this.setState({ client_id: response.data.data.id });
        let id = response.data.data.id;
        this.hanldeClientQueue(id);
      });
  };

  QueueList = async id => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/queue/doctor/${id}`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response, "people in queue");

        this.setState({
          peopleInQueue: [
            ...this.state.peopleInQueue.concat(response.data.data.queue)
          ]
        });
        this.PeopleBeforeYou();
      });
  };

  PeopleBeforeYou = () => {
    if (this.state.peopleInQueue.length !== 0) {
      let people = this.state.peopleInQueue.map(ppl => {
        return ppl.id;
      });
      let yourIndex = people.indexOf(this.state.currentClient.id);
      this.setState({ YourNumber: yourIndex });
    }
  };

  componentDidMount() {
    this.handleClientProfile();
    this.test();
    axios
      .get("https://health-care-backend.herokuapp.com/api/specialities/")
      .then(response => {
        const res = response.data.data.map(val => {
          return {
            value: val.id,
            iD: val.speciality_id,
            label: val.name,
            status: val.status
          };
        });
        this.setState({ specialities: res });
      });
    axios
      .get("https://health-care-backend.herokuapp.com/api/doctor/list")
      .then(response => {
        const res = response.data.data.map(val => {
          return {
            value: val.id,
            iD: val.doctor_id,
            label: val.doctor,
            spec: val.speciality,
            price: val.price,
            status: val.status
          };
        });
        this.setState({ doctors: res });
      });
  }

  // handleDoctorsStatus = () => {
  //   if (this.state.resetDoctorSelect.status !== "Available") {
  //     this.setState({ credits: false }),
  // this.handleExitQueue()
  //   }
  // };

  test = () =>
    navigator.webkitGetUserMedia(
      {
        video: true,
        audio: true
      },
      stream => {
        var Peer = require("simple-peer");
        // let id = Math.floor(Math.random() * 0xffffff).toString(16);
        // this.setState({ idToPush: id });
        var peer = new Peer({
          // initiator: window.location.hash === `#init`,
          trickle: false,
          stream: stream
        });

        peer.on("signal", data => {
          let docId = JSON.stringify(data);
          connection.send(docId);
        });

        document.getElementById("StartVideo").addEventListener("click", () => {
          peer.signal(this.state.hisId);
        });

        // document.getElementById("send").addEventListener("click", function() {
        //   var yourMessage = document.getElementById("yourMessage").value;
        //   peer.send(yourMessage);
        // });

        const connection = new WebSocket("ws://localhost:8080");

        connection.onopen = () => {
          console.log("connected");
        };

        connection.onclose = () => {
          console.error("disconnected");
        };

        connection.onerror = error => {
          console.error("failed to connect", error);
        };

        connection.onmessage = event => {
          console.log("received", event.data);
          this.setState({ hisId: event.data });
        };

        // document.querySelector("form").addEventListener("submit", event => {
        //   event.preventDefault();
        //   let message = document.querySelector("#message").value;
        //   connection.send(message);
        //   document.querySelector("#message").value = "";
        // });

        // peer.on("data", function(data) {
        //   document.getElementById("messages").textContent += data + "\n";
        // });

        peer.on("stream", function(stream) {
          const mediaStream = new MediaStream(stream);
          var video = document.createElement("video");
          document.body.appendChild(video);
          video.srcObject = mediaStream;
          video.play();
        });
      },
      function(err) {
        console.error(err);
      }
    );

  render() {
    return (
      <div className="container">
        <Header />
        <Nav />
        <WaitingRoom
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          handleSubject={this.handleSubject}
          handleSubmit={this.handleSubmit}
          handleMessage={this.handleMessage}
          handleExitQueue={this.handleExitQueue}
          props={this.state}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const doctor = state.getIn(["doctorReducer", "doctor"]);

  return {
    doctor,
    price: state.price
  };
};

export default connect(mapStateToProps)(ClientWaitingRoom);
