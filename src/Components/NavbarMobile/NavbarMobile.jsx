import React, { useState, useEffect } from 'react'
import './NavbarMobile.css'

import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import InputSearch from '../InputSerach/InputSearchs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSearch, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function NavbarMobile() {

    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(!modalOpen)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
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
        <section className={scrolled ? " scrolledMobile " : "scrolledMobile"}>

            <Anchor to={`/`} className={location.pathname === '/' ? 'active' : ''} onClick={closeModal}>
                <FontAwesomeIcon icon={faHome} />
            </Anchor>
            <Anchor to={`/login`} className={location.pathname === '/login' ? 'active' : ''} onClick={closeModal}>
                <FontAwesomeIcon icon={faUser} />
            </Anchor>

            <button onClick={modalOpen ? closeModal : openModal} className='plus'>
                {modalOpen ? <p >x</p> : <FontAwesomeIcon icon={faPlus} />}
            </button>


            <Anchor to={`/carrito`} className={location.pathname === '/carrito' ? 'active' : ''} onClick={closeModal}>
                <FontAwesomeIcon icon={faShoppingCart} />
            </Anchor>
            <Anchor to={`/`} className={location.pathname === '/search' ? 'active' : ''} onClick={closeModal}>
                <FontAwesomeIcon icon={faSearch} />
            </Anchor>
            {
                modalOpen && <div className='modalNavMobile'>


                    <Anchor to={`/`} >Inico</Anchor>
                    <Anchor to={`/`} >Zapatillas</Anchor>
                    <Anchor to={`/`} >Remeras</Anchor>
                    <Anchor to={`/`} >Pantalones</Anchor>


                </div>
            }

        </section>
    );
}
