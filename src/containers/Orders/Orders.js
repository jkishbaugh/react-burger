import React, {Component} from "react";
import Order from "../../components/CheckoutSummary/Order/Order";
import axios from "../../hoc/axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    ordersDisplay = this.props.orders.map(o => {
        return <Order/>
    })
    display = this.props.loading ? <Spinner/> : this.ordersDisplay;


    render() {

        return (
            <div>
                {this.props.orders.map(o => <Order key={o.id} ingredients={o.ingredients} price={+o.price}/>)}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.orders.loading,
        orders: state.orders.orders
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));