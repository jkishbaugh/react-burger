import React, {Component} from 'react'
import styles from './ContactData.css'
import Button from "../../../components/UI/Button/Button";
import axios from '../../../hoc/axios-orders'
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {purchaseBurger} from "../../../store/actions/orders";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid:false,
                touched:false,
                errorMessage:"Name has minimum length restriction of 5 characters."
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your Email"
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
                errorMessage: "Email is a required field!"
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Delivery Address"
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
                errorMessage: "Street address is a required field!"
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Postal Code"
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false,
                touched:false,
                errorMessage: "Postal Code can only be five digits long."
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Country"
                },
                value:'',
                validation: {
                    required: true
                },
                valid:false,
                touched:false,
                errorMessage: "Country is a required field!"
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest Delivery"},
                        {value: "cheapest", displayValue: "Cheapest Delivery"}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        formIsValid: false
    }
    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== ''&& isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
       const formData = {}
           for(let itemIdentifier in this.state.orderForm) {
             formData[itemIdentifier] = this.state.orderForm[itemIdentifier].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: formData
           };
       this.props.onOrderBurger(order)
    }
    inputChangedHandler(event, elementIdentifier){
        const updatedFormData = {...this.state.orderForm}
        const updatedElementData = {...updatedFormData[elementIdentifier]}
        updatedElementData.value = event.target.value
        updatedElementData.valid = this.checkValidity(updatedElementData.value, updatedElementData.validation)
        updatedElementData.touched = true
        let formIsValid = true;
        for(let identifier in updatedFormData){
            formIsValid = updatedFormData[identifier].valid && formIsValid;
        }

        updatedFormData[elementIdentifier] = updatedElementData
        this.setState({orderForm: updatedFormData, formIsValid: formIsValid})
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArray.map(element => {
                return (<Input key={element.id}
                               elementType={element.config.elementType}
                               elementConfig={element.config.elementConfig}
                               value={element.config.value}
                               invalid={!element.config.valid}
                               shouldValidate={element.config.validation}
                               touched={element.config.touched}
                               errorMessage={element.config.errorMessage}
                               changed={(event) => this.inputChangedHandler(event, element.id)}
                />)
            })}
            <Button btnType={"Success"} disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order Now</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Information</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        price: state.burgerBuilder.totalPrice,
        ings: state.burgerBuilder.ingredients,
        loading: state.orders.loading
    }
};
const mapDispatchToProps = dispatch => {
  return {
      onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));