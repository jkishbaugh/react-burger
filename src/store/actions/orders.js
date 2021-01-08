import * as actionTypes from './actionTypes';
import axios from "../../hoc/axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData
    }
}

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then(resp => {
                console.log(resp.data)
                dispatch(purchaseBurgerSuccess(resp.data, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFailure(err))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orderData
    }
}
export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart)
        axios.get('/orders.json').then(response => {
            const fetchOrders = []
            for( let key in response.data){
                fetchOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            console.log(response)
            dispatch(fetchOrdersSuccess(fetchOrders))
        }).catch(err => {
            dispatch(fetchOrdersFailed(err))
            console.error(err);
        })

    }
}