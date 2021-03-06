import React from "react";
import classes from './Logo.css'
import burgerLogo from "../../assests/images/original.png"

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt="logo"/>
    </div>
);

export default logo;