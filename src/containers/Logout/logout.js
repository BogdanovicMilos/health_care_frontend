import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import { userLoggedOut } from "../../actions/authActions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.handleLogout();
  }

  componentDidUpdate() {
    this.handleLogout();
  }

  handleLogout = e => {
    sessionStorage.clear();
    localStorage.clear();
    this.props.dispatch(userLoggedOut());
    this.redirectUser();
  };

  redirectUser = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Nav handleLogout={this.handleLogout} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const user = state.get("user");
  const isLoggedIn = state.get("isLoggedIn");
  console.log(isLoggedIn, user, "logOutttttttt");

  return {
    user,
    isLoggedIn
  };
};

export default connect(mapStateToProps)(Logout);
