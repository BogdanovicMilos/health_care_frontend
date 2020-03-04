import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import CorrespondenceMessage from "../../components/Client/Correspondence";
import { doctor } from "../../actions/examActions";

class ClientCorrespondence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correspondence: [],
      messageValue: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id,
      obj: "",
      active: true
    };
  }

  correspondence = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://health-care-backend.herokuapp.com/api/client/exams/${this.state.id}/messages`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        const res = response.data.data.map(val => {
          return {
            id: val.id,
            sender: val.sender,
            created: val.created,
            message: val.message,
            attachment: val.attachment
          };
        });
        this.setState({ correspondence: res });
        var sender_obj = this.state.correspondence[0].sender;
        this.props.dispatch(doctor(sender_obj));
      });
  };

  handleMessage = e => {
    this.setState({ messageValue: e.target.value });
  };

  handleClick = index => {
    console.log(this.state.active);

    let active = this.state.active;
    this.setState({ active: !this.state.active });
    this.setState({ obj: { ...this.state.correspondence[index], active } });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ messageValue: "" });
    // this.correspondence();
  };

  componentDidMount() {
    this.correspondence();
  }

  render() {
    return (
      <div className="container">
        <CorrespondenceMessage
          correspondence={this.state.correspondence}
          messageValue={this.state.messageValue}
          handleMessage={this.handleMessage}
          submitValue={this.state.submitValue}
          handleSubmit={this.handleSubmit}
          handleClick={this.handleClick}
          props={this.state}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const examID = state.getIn(["examReducer", "examID"]);
  return {
    examID
  };
};

export default connect(mapStateToProps)(ClientCorrespondence);
