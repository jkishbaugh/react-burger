import React, {Component} from 'react'
import styles from './ContactData.css'
import Button from "../../../components/UI/Button/Button";
import axios from '../../../hoc/axios-orders'
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your Email"
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Delivery Address"
                },
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Postal Code"
                },
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Country"
                },
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest Delivery"},
                        {value: "cheapest", displayValue: "Cheapest Delivery"}
                    ]
                },
            }
        }
    }
    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Justin Case",
                address: {
                    street: 'madeup ln.',
                    zipcode: '00000',
                    country: 'Fantasy'
                },
                email: "phoney@noneexistant.mail"
            },
            deliveryMethod: 'fastest'

        };
        axios.post('/orders.json', order)
            .then(resp => {
                this.setState({loading: false});
                this.props.history.push("/")
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err)
            })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form>
            {formElementArray.map(element => {
                return (<Input key={element.id}
                               elementType={element.config.elementType}
                               elementConfig={element.config.elementConfig}
                               value={element.config.value}
                />)
            })}
            <Button btnType={"Success"} clicked={this.orderHandler}>Order Now</Button>
        </form>);
        if (this.state.loading) {
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

export default ContactData;