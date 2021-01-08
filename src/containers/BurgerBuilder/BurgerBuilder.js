import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import axios from "../../hoc/axios-orders";

class BurgerBuilder extends Component{
    state = {
        purchasing: false,
    };
    componentDidMount() {
            this.props.onInitIngredients()
            this.props.onInitPurchase()
    }

    updatePurchaseState(){
        const ing = {
            ...this.props.ings
        };
        const sum = Object.keys(ing).map(igKey => {
            return ing[igKey];
        }).reduce((sum, el) =>{
            return sum + el;
        });
        return sum > 0
    }
    purchaseHandler = () =>{
        this.setState({purchasing: true})
    };
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout")
    };

    render() {

        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error?<p>Ingredients could not be loaded</p>: <Spinner />;
        let orderSummary = null ;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls disabled={disabledInfo}
                                   ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemoved={this.props.onIngredientRemoved}
                                   price={this.props.price}
                                   purchasable={this.updatePurchaseState()}
                                   purchasing={this.purchaseHandler}
                    />
                </Aux>);
            orderSummary = (
                    <OrderSummary
                        totalPrice={this.props.price}
                        ingredients={this.props.ings}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
            )

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));