import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import PaymentForm from "./components/paymentForm/PaymentForm";
import api from "./api";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: null
    };
  }

  componentDidMount() {
    api.getPublicStripeKey().then(apiKey => {
      this.setState({
        apiKey: apiKey
      });
    });
  }

  render() {
    return (
      <div className="checkout">
        <h1 className="checkout-title">Merci pour votre reservation</h1>
        <h2 className="checkout-title2">Passer au paiement</h2>
        {this.state.apiKey && (
          <StripeProvider apiKey={this.state.apiKey}>
            <Elements>
                <div className="App">
                  <div className="sr-root">
                    <div className="sr-main">
                <PaymentForm idFlight={this.props.match.params.idFlight} />
                </div>
                <div className="sr-content">
                  <div className="pasha-image-stack">
                    <img
                      src="https://picsum.photos/280/320?random=1"
                      width="140"
                      height="160"
                alt="picsum"
                    />
                    <img
                      src="https://picsum.photos/280/320?random=2"
                      width="140"
                      height="160"
                alt="picsum"
                    />
                    <img
                      src="https://picsum.photos/280/320?random=3"
                      width="140"
                      height="160"
                alt="picsum"
                    />
                    <img
                      src="https://picsum.photos/280/320?random=4"
                      width="140"
                      height="160"
                alt="picsum"
                    />
                  </div>
                </div>
                </div>
                </div>
              </Elements>
          </StripeProvider>
        )}
      </div>
    );
  }
}

export default Checkout;
