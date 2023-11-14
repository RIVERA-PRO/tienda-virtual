import React, { useState, useEffect } from 'react';
import './UsersCantidad.css';
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';

export default function UsersCantidad() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {

        fetch('https://tiendavirtual-qleq.onrender.com/users')
            .then(response => response.json())
            .then(data => {

                setUsers(data?.users);

                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
                setLoading(false);

            });

    };





    return (
        <div >





            {loading ? (
                <div className='cardDashboardCantidad'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={faUser} className='iconDash' />
                        <div>
                            <h4>Usuarios</h4>
                            <h5> Cargando</h5>

                        </div>
                    </div>
                    <Anchor className='linea'>
                        ---
                    </Anchor>
                    <Anchor to='/usuarios' className='more'>
                        Ver más    <FontAwesomeIcon icon={faArrowRight} />
                    </Anchor>

                </div>

            ) : (
                <div className='cardDashboardCantidad'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={faUser} className='iconDash' />
                        <div>
                            <h4>Usuarios</h4>
                            <h3 className='title-cantidad'> {users?.length}</h3>

                        </div>
                    </div>
                    <Anchor className='linea'>
                        ---
                    </Anchor>
                    <Anchor to='/usuarios' className='more'>
                        Ver más    <FontAwesomeIcon icon={faArrowRight} />
                    </Anchor>

                </div>



            )}


        </div>
    );
}
