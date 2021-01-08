import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from "./ContactData/ContactData";
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";


class Checkout extends Component {

    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        let summary = <Redirect to={"/"}/>
        if (this.props.ings) {
            const purchased = this.props.purchased? <Redirect to={"/"}/>: null
            summary = (<>
                    {purchased}
                    <CheckoutSummary checkoutCancelled={this.checkOutCancelledHandler}
                                     checkoutContinued={this.checkoutContinuedHandler}
                                     ingredients={this.props.ings}/>
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData}/>
                </>
            )
        }
        return (
            <div>{summary}</div>
        )

    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
};
export default connect(mapStateToProps)(Checkout);