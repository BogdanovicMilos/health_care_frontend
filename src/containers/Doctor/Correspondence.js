import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import CorrespondenceMessage from "../../components/Doctor/Correspondence";
import { doctor } from "../../actions/examActions";

class Correspondence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correspondence: [],
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id
    };
  }

  correspondence = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000/api/doctor/exams/${this.state.id}/messages`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response);

        const res = response.data.message.map(val => {
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

  componentDidMount() {
    this.correspondence();
    console.log(this.state.id);
  }

  render() {
    console.log(this.state.id);

    return (
      <div className="container">
        <CorrespondenceMessage correspondence={this.state.correspondence} />
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

export default connect(mapStateToProps)(Correspondence);
