import React from "react";
import PropTypes from "prop-types";

class SagaMiddlewareProvider extends React.Component {
  getChildContext() {
    return {
      sagaMiddleware: this.props.sagaMiddleware
    };
  }
  render() {
    return this.props.children || null;
  }
}

SagaMiddlewareProvider.childContextTypes = {
  sagaMiddleware: PropTypes.any.isRequired
};

export default SagaMiddlewareProvider;
