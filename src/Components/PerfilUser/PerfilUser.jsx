import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PerfilUser.css'
import img from '../../images/3.png'
import Logout from '../Logout/Logout'
export default function PerfilUser() {
    const { id } = useParams(); // Obtener el user_id de los parámetros de la URL
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    let token = localStorage.getItem('token');
    let headers = { headers: { 'Authorization': `Bearer ${token}` } };
    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`https://tiendavirtual-qleq.onrender.com/users/${id}`, headers)
                .then(response => response.json())
                .then(data => {
                    setUserData(data.user[0]);
                    setLoading(false);
                    console.log(data.user[0])
                })
                .catch(error => {
                    console.error('Error al obtener los datos del usuario:', error);
                    setLoading(false);
                });
        }, 5000);
        return () => clearTimeout(timer);
    }, [id]);

    return (
        <div className='perfilUser'>
            <div className='fondoPage'>

            </div>
            {userData ? (
                <div className='infoUserCard'>
                    <img src={userData?.photo} alt={userData.name} />
                    <h3>Hola ! {userData?.name}</h3>
                    <p>{userData?.mail}</p>
                    <Logout />
                </div>
            ) : (
                <div className='infoUserCard'>
                    <div className='imgloading'>

                    </div>
                    <div className='textLoading'></div>
                    <div className='textLoading'></div>
                </div>
            )}
        </div>
    );
}
