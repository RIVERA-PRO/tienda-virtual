import React from 'react';
import './LogoutDashboard.css'
import { useNavigate } from 'react-router';

import { Link as Anchor, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


export default function LogoutDashboard() {

    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setInterval(() => window.location.href = '/')
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sesion cerrada',
            showConfirmButton: false,
            timer: 1500
        })

    }

    return (

        <Anchor onClick={handleLogout}>
            < FontAwesomeIcon icon={faSignOutAlt} /> Salir
        </Anchor >
    )
}
