import React from 'react';
import styles from './Input.css'

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [styles.InputElement]
    if(props.invalid && props.shouldValidate){
        if(props.touched){
            inputClasses.push(styles.Invalid)
        }
    }
    if(props.invalid && props.touched){
        validationError= <p className={styles.ValidationError}>{props.errorMessage}</p>
    }
    switch (props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case('select'):
            const options = props.elementConfig.options.map(opt => {
                return (<option key={opt.value} value={opt.value}>{opt.displayValue}</option>)
            })
            inputElement = <select className={inputClasses.join(' ')} name={props.elementConfig.name} value={props.value} onChange={props.changed}>
                <option value={""}>Please Select a Delivery Option</option>
                {options}
            </select>
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    return (
        <div className={styles.Input}>
            {validationError}
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>

    );

}

export default Input;
