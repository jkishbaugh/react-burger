import React from 'react';
import styles from './Input.css'

const Input = (props) => {
    let inputElement = null;
    switch (props.elementType){
        case('input'):
            inputElement = <input className={styles.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        case('textarea'):
            inputElement = <textarea className={styles.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        case('select'):
            const options = props.elementConfig.options.map(opt => {
                return (<option key={opt.value} value={opt.value}>{opt.displayValue}</option>)
            })
            inputElement = <select className={styles.InputElement} name={props.elementConfig.name} value={props.value}>
                <option value={""}>Please Select a Delivery Option</option>
                {options}
            </select>
            break;
        default:
            inputElement = <input className={styles.InputElement} {...props.elementConfig} value={props.value}/>
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>

    );

}

export default Input;
