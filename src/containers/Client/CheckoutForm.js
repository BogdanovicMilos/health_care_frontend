import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import { compose } from "redux";
import "../../assets/client/checkout.scss";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router-dom";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
  }

  submit = async ev => {
    // ev.preventDefault();
    const price = parseInt(this.props.doctor.price, 10);
    const cardElement = this.props.elements.getElement("card");
    const { paymentMethod } = await this.props.stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });
    if (paymentMethod === undefined) {
      NotificationManager.error("Faild to Checkout", "Faild!", 2000);
    } else if (paymentMethod !== undefined) {
      const response = await fetch(
        "https://health-care-backend.herokuapp.com/api/charge/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            payment_method_id: paymentMethod.id,
            amount: price
          })
        }
      );
      // await handleServerResponse(await response.json())
      const data = await response.json();
      console.log(data);

      if (data.message === "Payment completed") {
        this.setState({ complete: true });
        NotificationManager.success("Checkout Completed", "Successful!", 2000);
      }
    }
  };

  // handleServerResponse = async (response) => {
  //   if (response.error) {
  //     // Show error from server on payment form
  //   } else if (response.requires_action) {
  //     // Use Stripe.js to handle the required card action
  //     const { error: errorAction, paymentIntent } =
  //       await this.props.stripe.handleCardAction(response.payment_intent_client_secret);

  //     if (errorAction) {
  //       // Show error from Stripe.js in payment form
  //     } else {
  //       // The card action has been handled
  //       // The PaymentIntent can be confirmed again on the server
  //       const serverResponse = await fetch('/pay', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ payment_intent_id: paymentIntent.id })
  //       });
  //       handleServerResponse(await serverResponse.json());
  //     }
  //   } else {
  //     // Show success message
  //   }
  // }

  handleReady = element => {
    this.setState({ cardElement: element });
  };

  render() {
    if (this.state.complete) {
      return <Redirect to="/dashboard-client" />;
    }
    return (
      <div className="mainCardDiv">
        <CardElement className="CardElement" onReady={this.handleReady} />
        <button className="btn-checkout" onClick={this.submit}>
          {" "}
          Submit{" "}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const doctor = state.getIn(["doctorReducer", "doctor"]);
  return {
    doctor
  };
};

export default compose(connect(mapStateToProps), injectStripe)(CheckoutForm);
