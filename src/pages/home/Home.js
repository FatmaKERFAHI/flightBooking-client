import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import styles from './Home.module.css'

class Home extends Component {
    render() {
        return (
            <div className={styles.bgHome}>
                <p className={styles.bgTitre}>Flight Booking</p>
                <Redirect  to="/search" />
            </div>
        )
    }
}
export default Home