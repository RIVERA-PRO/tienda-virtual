import React, { useState, useEffect } from 'react';
import './NavbarMobile.css';
import { Link as Anchor, useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faShoppingCart, faSearch, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import InfoUser from '../InfoUser/InfoUser';
import InputSearchMobile from '../InputSearchMobile/InputSearchMobile';
import CarritoUser from '../CarritoUser/CarritoUser';
export default function NavbarMobile() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
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
    const openModal = () => {
        setModalOpen(!modalOpen);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className={scrolled ? 'scrolledMobile' : 'scrolledMobile'}>
            <Anchor to={`/`} className={location.pathname === '/' ? 'active' : ''} onClick={closeModal}>
                <FontAwesomeIcon icon={faHome} />
            </Anchor>
            <Anchor className={location.pathname === '/login' ? 'active' : ''} onClick={closeModal}>
                <InfoUser />
            </Anchor>

            <button onClick={modalOpen ? closeModal : openModal} className="plus">
                {modalOpen ? <p>x</p> : <FontAwesomeIcon icon={faPlus} />}
            </button>

            <Anchor to={`/carrito`} className={location.pathname === '/carrito' ? 'active' : ''} onClick={closeModal}>
                <CarritoUser />
            </Anchor>

            <InputSearchMobile />

            {modalOpen && (
                <div className="modalNavMobileContain">
                    <div className="modalNavMobile">
                        <span className="close" onClick={closeModal}>X</span>
                        <Anchor to={`/`}>
                            <FontAwesomeIcon icon={faHome} /> Inicio
                        </Anchor>
                        <Anchor to={`/products`}>
                            <FontAwesomeIcon icon={faSearch} /> Zapatillas
                        </Anchor>
                        <Anchor to={`/products`}>
                            <FontAwesomeIcon icon={faSearch} /> Remeras
                        </Anchor>
                        <Anchor to={`/products`}>
                            <FontAwesomeIcon icon={faSearch} /> Pantalones
                        </Anchor>

                        {userData?.is_admin === true && <Anchor to={`/dashboard`} >  <FontAwesomeIcon icon={faChartPie} /> Dashboard</Anchor>}
                    </div>
                </div>
            )}
        </section>
    );
}
