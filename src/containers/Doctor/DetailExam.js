import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import Detail from "../../components/Doctor/DetailExam";

const options = [
  { value: "Accept", label: "Accept" },
  { value: "Decline", label: "Decline" }
];

class DetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: ""
    };
  }

  detail = id => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000/api/doctor/exams/${id}`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response);

        this.setState({ exam: this.state.exam.concat(response.data.data) });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = this.props.match.params.id;
    this.props.history.push("/dashboard-doctor");

    this.doctorExam(id);
  };

  handleLink = () => {
    this.props.history.push(`/doctor/exam/correspondence/${this.state.id}`);
  };

  handleLinkMessage = () => {
    console.log(this.state.id);

    this.props.history.push(`/doctor/exam/message/${this.state.id}`);
  };

  handleStatus = statusValue => {
    this.setState({ statusValue });
    let { value, label } = statusValue;
    console.log(value, label);
    this.setState({ selectedStatus: value });
  };

  doctorExam = async id => {
    const access_token = "Bearer ".concat(this.state.token);
    const client = await fetch(
      `http://127.0.0.1:8000/api/doctor/exams/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          state: this.state.selectedStatus
        })
      }
    );
    const jsonData = await client.json();
    return jsonData;
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id });
    this.detail(id);
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
    );
  }
}

// const mapStateToProps = state => {
//   const examID = state.getIn(["examReducer", "examID"]);
//   return {
//     examID
//   };
// };

export default DetailExam;
