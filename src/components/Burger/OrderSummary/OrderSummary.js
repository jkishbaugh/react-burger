import React, {Component} from "react";
import Aux from '../../../hoc/Auxillary/Auxillary'
import Button from "../../UI/Button/Button";


class orderSummary extends Component {
    ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
        return <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>
                      : {this.props.ingredients[igKey]}
                </li>
    });
    render(){
        return (
            <Aux>
                <h3>Your Order</h3>
                <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {this.ingredientSummary}
                </ul>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
};

export default orderSummary;