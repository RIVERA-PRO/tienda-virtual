import React, { useState, useEffect } from 'react'
import './Navbar.css'

import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import InputSearch from '../InputSerach/InputSearchs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartPie } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png'
import InfoUser from '../InfoUser/InfoUser'
import CarritoUser from '../CarritoUser/CarritoUser'

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false);
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




    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 100) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <header className={scrolled ? "navbar scrolled " : "navbar"}>
            <nav >

                <Anchor to={`/`} className='logo'>
                    <img src={logo} alt="logo" />

                </Anchor>


                <div className={`nav_items ${isOpen && "open"}`} >

                    <div className='deFlexClose'>
                        <Anchor to={`/`} className='logo-nav'>
                            <img src={logo} alt="logo" />
                        </Anchor>


                    </div>

                    <div className='enlaces'>

                        <Anchor to={`/`} ><FontAwesomeIcon icon={faHome} /> Inico</Anchor>
                        <Anchor to={`/products`} ><FontAwesomeIcon icon={faHome} /> Zapatillas</Anchor>
                        <Anchor to={`/products`} ><FontAwesomeIcon icon={faHome} /> Remeras</Anchor>
                        <Anchor to={`/products`} ><FontAwesomeIcon icon={faHome} /> Pantalones</Anchor>
                        {userData?.is_admin === true && <Anchor to={`/dashboard`} >  <FontAwesomeIcon icon={faChartPie} /> Dashboard</Anchor>}
                    </div>


                </div>


                <div className='enlaces2'>
                    <Anchor to={`/`} >Inico</Anchor>
                    <Anchor to={`/products`} >Zapatillas</Anchor>
                    <Anchor to={`/products`} >Remeras</Anchor>
                    <Anchor to={`/products`} >Pantalones</Anchor>

                    {userData?.is_admin === true && <Anchor to={`/dashboard`} >  Dashboard</Anchor>}
                </div>

                <div className='deFlexnav'>

                    <InputSearch />
                    <div className={`nav_toggle  ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className='btn-sesion'>
                        <InfoUser />
                    </div>
                    <div className='btn-sesion'>
                        <CarritoUser />
                    </div>



                </div>







            </nav>


        </header>
    );
}
