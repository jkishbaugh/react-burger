import React, {Component} from "react";
import Order from "../../components/CheckoutSummary/Order/Order";
import axios from "../../hoc/axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    }

    componentShouldUpdate() {

    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const fetchedOrders = []
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            console.log(fetchedOrders)
            this.setState({loading: false, orders: fetchedOrders});

        }).catch(err => {
            this.setState({loading: false})
            console.error(err);
        })
    }

    ordersDisplay = this.state.orders.map(o => {
        return <Order/>
    })
    display = this.state.loading ? <Spinner/> : this.ordersDisplay;


    render() {

        return (
            <div>
                {this.state.orders.map(o => <Order key={o.id} ingredients={o.ingredients} price={+o.price}/>)}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);