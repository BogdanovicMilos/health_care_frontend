import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Dashboard from "../../components/Client/Dashboard";

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      paginatedExams: [],
      token: sessionStorage.getItem("accessToken"),
      dataFromServer: "",
      loading: true,
      page: 1,
      maxPages: ""
    };
  }

  initiate = () => {
    this.props.history.push("/initiate");
  };
  waitingRoom = () => {
    this.props.history.push("/client/waiting-room");
  };
  VideoReq = () => {
    this.props.history.push("/client/video-request");
  };

  componentDidMount() {
    this.connect();
    this.paginatedExams();
    // this.videoReqStatus();
  }

  handleClickLeft = () => {
    if (this.state.page !== 1) {
      this.setState({ page: this.state.page - 1 });
      let test = setInterval(() => {
        this.paginate(this.state.page);
        clearInterval(test);
      }, 10);
    }
  };
  handleClickRight = () => {
    if (this.state.page !== this.state.maxPages) {
      this.setState({ page: this.state.page + 1 });
      let test = setInterval(() => {
        this.paginate(this.state.page);
        clearInterval(test);
      }, 10);
    }
  };

  connect = () => {
    var ws = new WebSocket(
      "wss://127.0.0.1:8000/ws/exam/status/"
    );
    let that = this;
    var connectInterval;
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      // console.log("connected");
      this.setState({ ws: ws });
    };
    ws.onmessage = e => {
      // listen to data sent from the websocket server
      this.paginatedExams();
      const message = JSON.parse(e.data);
      this.state.exams.map(exam => {
        if (exam.exam === message.id) {
          var state = message.status;
          let new_exam = Object.assign({ ...exam }, exam);
          new_exam.status = state;
          return { new_exam };
        } else {
          return console.log("Does not exist.");
        }
      });
    };
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );
      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(1, that.timeout)); //c
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
  };

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/client/exam/detail/${id}`);
    } else if (type === "video") {
      this.props.history.push(`/client/video/exam/detail/${id}`);
    }
  };

  handleChange = e => {
    if (e.target.value === "earliest") {
      let earl = this.state.exams;
      let sort = earl.sort(
        (a, b) => Date.parse(a.created) - Date.parse(b.created)
      );
      this.setState({ exams: sort });
      this.paginate(this.state.page);
    } else {
      let lates = this.state.exams;
      let resort = lates.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );
      this.setState({ exams: resort });
      this.paginate(this.state.page);
    }
  };

  videoReqStatus = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000/api/web/client/list/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response.data.data, "videooo-request-list");

        this.setState({
          exams: [...this.state.exams.concat(response.data.data)]
        });
        this.paginate(this.state.page);
      });
  };

  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000/api/mail/client/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        this.setState({
          exams: [...this.state.exams.concat(response.data.data)]
        });
        this.videoReqStatus();
        this.paginate(this.state.page);
      });
  };

  paginate = page => {
    let limit = 5;
    let pages = Math.ceil(this.state.exams.length / 5);
    const offset = (page - 1) * limit;
    const newArray = this.state.exams.slice(offset, offset + limit);

    this.setState({
      paginatedExams: newArray,
      loading: false,
      maxPages: pages
    });
  };

  render() {
    // console.log(this.state.paginatedExams);
    // console.log(this.state.exams, "teeeeeeeeeeest");

    return (
      <div className="container">
        <Header />
        <Nav />
        <Dashboard
          initiate={this.initiate}
          waitingRoom={this.waitingRoom}
          paginatedExams={this.state.paginatedExams}
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          handleClickLeft={this.handleClickLeft}
          handleClickRight={this.handleClickRight}
          loading={this.state.loading}
          VideoReq={this.VideoReq}
        />
      </div>
    );
  }
}

export default ClientDashboard;
