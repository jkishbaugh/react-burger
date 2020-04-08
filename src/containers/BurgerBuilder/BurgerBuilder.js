import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../hoc/axios-orders';


const INGREDIENT_PRICES = {
    lettuce: 0.3,
    cheese: 0.5,
    meat: 1.2,
    bacon: 0.7
};
class BurgerBuilder extends Component{
    state = {
        ingredients : {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };
    updatePurchaseState(ingredients){
        const ing = {
            ...ingredients
        };
        const sum = Object.keys(ing).map(igKey => {
            return ing[igKey];
        }).reduce((sum, el) =>{
            return sum + el;
        },0);
        this.setState({purchasable:sum > 0})
    }
    purchaseHandler = () =>{
        this.setState({purchasing: true})
    };
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    };

    purchaseContinueHandler = () => {
       // console.log("you continued");
       const order = {
           ingredients:this.state.ingredients,
           price: this.state.totalPrice,
           customer: {
               name: "Justin Case",
               address: {
                   street:'madeup ln.',
                   zipcode: '00000',
                   country:'Fantasy'
               },
               email: "phoney@noneexistant.mail"
           },
           deliveryMethod: 'fastest'

       };
        axios.post('/orders.json', order)
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    };
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceChange = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceChange;

        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    };
    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>


               <Burger ingredients={this.state.ingredients}/>
               <BuildControls disabled={disabledInfo}
                              ingredientAdded={this.addIngredientHandler}
                              ingredientRemoved={this.removeIngredientHandler}
                              price={this.state.totalPrice}
                              purchasable={this.state.purchasable}
                              purchasing={this.purchaseHandler}
               />
            </Aux>
        );
    }
}

export default BurgerBuilder;