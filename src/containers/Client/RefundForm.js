import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import "../../assets/client/checkout.scss";


class RefundForm extends Component{
  constructor(props) {
    super(props);
    this.state = {complete: false};
  }

  submit = async (ev) => {
    // ev.preventDefault();
    // const cardElement = this.props.elements.getElement('card');
    // const {paymentMethod} = await this.props.stripe.createPaymentMethod({type: 'card', card: cardElement});
    // console.log(paymentMethod, 'pejment')

    const response = await fetch('http://127.0.0.1:8000/api/payment/refund/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            charge: 'pm_1G5Yg0Av5Q6ZqJ9yHOZx5mMk',
            payment_intent: 'pm_1G5Yg0Av5Q6ZqJ9yHOZx5mMk',
            amount: parseInt(this.props.price, 10)
        })
      }
    );
    const data = await response.json()
    console.log(data, 'data')
    if (data.message === true){
      this.setState({complete: true})
    }
    console.log(this.state.complete)
  }

  handleReady = (element) => {
    this.setState({cardElement: element}) ;
  };

  render() {
    if (this.state.complete) return <h1><Link to="/dashboard-client">Submit Completed</Link></h1>;
    return (
      <div>
        <CardElement className="CardElement" onReady={this.handleReady}/>
        <button className="btn-checkout" onClick={this.submit}> Submit </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const price = state.getIn(['priceReducer', 'price']);
  console.log(price, 'cena')
  return {
      price,
  }
}

export default compose(
  connect(mapStateToProps),
  injectStripe
  )(RefundForm);