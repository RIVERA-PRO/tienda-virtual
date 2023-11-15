import React, { useState, useEffect } from 'react'
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard'
import UsersCantidad from '../UsersCantidad/UsersCantidad'
import ProdcutosCantidad from '../ProductosCantidad/ProductosCantidad'
import ComprasCantidad from '../ComprasCantidad/ComprasCantidad'
import UserDashboardMain from '../UserDashboardMain/UserDashboardMain'
import ProductsDashboardMain from '../ProductsDashboardMain/ProductsDashboardMain'
import PerfilDashboard from '../PerfilDashboard/PerfilDashboard'
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './MainDashboard.css'
import LoginDashboard from '../LoginDashboard/LoginDashboard'
export default function MainDashboard() {
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

        <>
            {userData ? (
                <div className='dashboardGridMain'>
                    <NavbarDashboard />

                    <section className='sectionDashboardMain'>
                        <PerfilDashboard />
                        <div className='sectionDashboardMain2'>
                            <div>
                                <div className='cantidades'>
                                    <UsersCantidad />
                                    <ProdcutosCantidad />
                                    <ComprasCantidad />
                                    <ComprasCantidad />

                                </div>
                                <ProductsDashboardMain />

                            </div>
                            <UserDashboardMain />
                        </div>

                    </section>





                </div>
            ) : (
                <div className='loginDashboard'>
                    <LoginDashboard />
                </div>

            )}
        </>

    )
}
