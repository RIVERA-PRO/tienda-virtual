import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link as Anchor } from 'react-router-dom';
import './CarritoUser.css';

function CarritoUser() {
    const [userData, setUserData] = useState(null);


    const updateUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    };



    useEffect(() => {
        updateUserData();



    }, []);

    return (
        <div className='userInfoContainer'>
            {userData ? (
                <div>
                    <Anchor to={`/carrito`}>
                        <FontAwesomeIcon icon={faShoppingCart} />

                    </Anchor>

                </div>
            ) : (
                <Anchor to={`/login`}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </Anchor>
            )}
        </div>
    );
}

export default CarritoUser;
