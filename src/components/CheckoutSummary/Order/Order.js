import  React from 'react'
import styles from "./Order.css"

const order = (props) => {
    let ingredientString = Object.keys(props.ingredients).map(igKey => {
        return (<span key={igKey}>${igKey}({props.ingredients[igKey]})</span>)
    })
    return (
        <div className={styles.Order}>
            <p>Ingredient: {ingredientString} </p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;