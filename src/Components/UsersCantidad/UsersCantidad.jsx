import React, { useState, useEffect } from 'react';
import './UsersCantidad.css';
import { Link as Anchor } from "react-router-dom";


export default function UsersCantidad() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setTimeout(() => {
            fetch('https://tiendavirtual-qleq.onrender.com/users')
                .then(response => response.json())
                .then(data => {

                    setUsers(data.users);

                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener los usuarios:', error);
                    setLoading(false);

                });
        }, 2000);
    };





    return (
        <div >





            {loading ? (
                <div className='cardDashboardCantidad'>
                    <h3 className='title-cantidad'> {users.length}</h3>
                    <h4>Usuarios</h4>


                </div>

            ) : (
                <div className='cardDashboardCantidad'>
                    <h3 className='title-cantidad'> {users.length}</h3>
                    <h4>Usuarios</h4>
                </div>



            )}


        </div>
    );
}
