//A homepage

import React, { Component } from 'react';

import shared from "./shared.module.css";
import styles from "./homepage.module.css";

export default class Homepage extends Component {
    
    render() {
        return (
            <div className={`${shared["container-div"]} ${styles.homepage}`}>
                <h1 className={styles.message}>Welcome to our Health App</h1>
            </div>
        )
    }
}