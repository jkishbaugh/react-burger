import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router";


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                console.log(param[1] + "price param")
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {

        return (
            <div>
                <CheckoutSummary checkoutCancelled={this.checkOutCancelledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}
                                 ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path + "/contact-data"} render={(props) => (
                    <ContactData ingredients={this.state.ingredients}
                                 price={this.state.totalPrice} {...props}/>)}/>
            </div>

        )

    }

}

export default Checkout