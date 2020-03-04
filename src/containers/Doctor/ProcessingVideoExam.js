import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import Processing from "../../components/Doctor/ProcessingVideoExam";

class ProcessingVideoExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      token: sessionStorage.getItem("accessToken"),
      connected: false,
      yourId: "",
      hisId: "",
      startVideo: false
    };
  }

  detail = id => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000/api/queue/detail/${id}`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        this.setState({ exam: this.state.exam.concat(response.data.data) });
      });
  };

  handleConnect = e => {
    e.preventDefault();
    this.setState({ connected: true });
    this.test();
  };

  handleVideoStart = e => {
    e.preventDefault();
    this.setState({ startVideo: true });
  };

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
          initiator: window.location.hash === `#init`,
          trickle: false,
          stream: stream
        });

        peer.on("signal", data => {
          let docId = JSON.stringify(data);
          this.setState({ yourId: docId });
          connection.send(this.state.yourId);
        });

        document
          .getElementById("DoctorStartVideo")
          .addEventListener("click", () => {
            peer.signal(this.state.hisId);
          });

        // document.getElementById("send").addEventListener("click", function() {
        //   var yourMessage = document.getElementById("yourMessage").value;
        //   peer.send(yourMessage);
        // });
        const connection = new WebSocket("ws://127.0.0.1:8000/ws/video/");

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

        peer.on("stream", stream => {
          const mediaStream = new MediaStream(stream);
          var video = document.createElement("video");
          var videoo = document.getElementById("videoo");
          videoo.style.display = this.state.startVideo ? "block" : "none";
          videoo.appendChild(video);
          video.srcObject = mediaStream;
          video.play();
        });
      },
      function(err) {
        console.error(err);
      }
    );

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id });
    this.detail(id);
  }

  render() {
    return (
      <div className="container">
        <Processing
          exam={this.state.exam}
          handleConnect={this.handleConnect}
          connected={this.state.connected}
          handleVideoStart={this.handleVideoStart}
        />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const examID = state.getIn(["examReducer", "examID"]);
//   return {
//     examID
//   };
// };

export default ProcessingVideoExam;
