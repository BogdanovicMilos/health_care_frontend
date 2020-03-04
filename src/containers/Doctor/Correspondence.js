import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import CorrespondenceMessage from "../../components/Doctor/Correspondence";
// import { doctor } from "../../actions/examActions";

class Correspondence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correspondence: [],
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
        `https://health-care-backend.herokuapp.com/api/doctor/exams/${this.state.id}/messages`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        console.log(response);

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
        // var sender_obj = this.state.correspondence[0].sender;
        // this.props.dispatch(doctor(sender_obj));
      });
  };

  componentDidMount() {
    this.correspondence();
    console.log(this.state.id);
  }

  handleClick = index => {
    console.log(this.state.active);

    let active = this.state.active;
    this.setState({ active: !this.state.active });
    this.setState({ obj: { ...this.state.correspondence[index], active } });
  };

  render() {
    console.log(this.state.id);

    return (
      <div className="container">
        <CorrespondenceMessage
          correspondence={this.state.correspondence}
          props={this.state}
          handleClick={this.handleClick}
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

export default Correspondence;
