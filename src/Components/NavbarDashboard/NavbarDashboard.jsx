import { React, useState, useEffect } from 'react';
import './NavbarDashboard.css';
import { Link as Anchor, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faUser, faShoppingCart, faBox, faHome } from '@fortawesome/free-solid-svg-icons';
import LogoutDashboard from '../LogoutDashboard/LogoutDashboard';
export default function NavbarDashboard() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false)

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
        <div className={`navbarDashboard ${isOpen && "openNav"}`} >
            <div className={`nav_open  ${isOpen && "openNav"}`} onClick={() => setIsOpen(!isOpen)}>

                <div className='spans'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {userData ? (
                    <div className='adminInfo'>
                        <img src={userData.photo} alt="" />
                        <div>
                            <p>{userData.name}</p>
                            <h5>{userData.mail}</h5>
                        </div>
                    </div>
                ) : (
                    <Anchor to={`/login`} >
                        <FontAwesomeIcon icon={faUser} />
                    </Anchor>

                )}
            </div>
            <Anchor to='/dashboard' className={location.pathname === '/dashboard' ? 'activeLink' : ''}>
                <FontAwesomeIcon icon={faChartPie} /> Dashboard
            </Anchor>
            <Anchor to='/' >
                <FontAwesomeIcon icon={faHome} /> Inicio
            </Anchor>
            <Anchor to='/usuarios'>
                <FontAwesomeIcon icon={faUser} /> Usuarios
            </Anchor>

            <Anchor to='/productos' className={location.pathname === '/productos' ? 'activeLink' : ''}>
                <FontAwesomeIcon icon={faBox} /> Productos
            </Anchor>
            <Anchor to='/compras'>
                <FontAwesomeIcon icon={faShoppingCart} /> Compras
            </Anchor>
            <LogoutDashboard />
        </div>
    );
}
