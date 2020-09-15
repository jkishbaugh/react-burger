import React, {Component} from 'react'
import styles from './ContactData.css'
import Button from "../../../components/UI/Button/Button";
import axios from '../../../hoc/axios-orders'
class ContactData extends Component {
    state ={
        name:'',
        email: '',
        address: {
            street: '',
            postalCode:''
        }
    }
    orderHandler = (event) => {
        event.preventDefault()
         this.setState({loading:true});
               const order = {
                   ingredients:this.props.ingredients,
                   price: this.props.price,
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
                    .then(resp => {
                        this.setState({loading:false});
                        console.log(resp)
                    })
                    .catch(err =>{
                        this.setState({loading:false});
                        console.log(err)
                    })
    }

    render(){
        return(
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Information</h4>
                <form>
                    <input type="text" className={styles.Input} placeholder="Your Name"/>
                    <input type="email" className={styles.Input} placeholder="Your Email"/>
                    <input type="text" className={styles.Input} placeholder="Your Street Address"/>
                    <input type="text" className={styles.Input} placeholder="Your Postal Code"/>
                    <Button btnType={"Success"} clicked={this.orderHandler}>Order Now</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;