import React from 'react';
import './logout.css'
import { useNavigate } from 'react-router';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


export default function LogoutButton() {

  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('carrito');
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
    <button className='logoutBtn' onClick={handleLogout}>  <FontAwesomeIcon icon={faSignOutAlt} />Cerrar Sesion</button>
  )
}
