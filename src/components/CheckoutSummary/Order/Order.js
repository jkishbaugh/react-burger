import  React from 'react'
import styles from "./Order.css"

const order = (props) => {
    return (
        <div className={styles.Order}>
            <p>Ingredient: Lettuce(0) </p>
            <p>Price: <strong>$5.45</strong></p>
        </div>
    )
}

export default order;