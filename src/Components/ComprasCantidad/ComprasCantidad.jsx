import React, { useState, useEffect } from 'react';

import { Link as Anchor } from "react-router-dom";
import { faArrowRight, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function UsersCantidad() {
    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {

        fetch('https://tiendavirtual-qleq.onrender.com/compras')
            .then(response => response.json())
            .then(data => {

                setProducto(data?.compras);

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
                        <FontAwesomeIcon icon={faShoppingBag} className='iconDash' />
                        <div>
                            <h4>Compras</h4>
                            <h5> Cargando</h5>

                        </div>
                    </div>
                    <Anchor className='linea'>
                        ---
                    </Anchor>
                    <Anchor to='/productos' className='more'>
                        Ver más    <FontAwesomeIcon icon={faArrowRight} />
                    </Anchor>

                </div>

            ) : (
                <div className='cardDashboardCantidad'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={faShoppingBag} className='iconDash' />
                        <div>
                            <h4>Compras</h4>
                            <h3 className='title-cantidad'> 0</h3>

                        </div>
                    </div>
                    <Anchor className='linea'>
                        ---
                    </Anchor>
                    <Anchor to='/productos' className='more'>
                        Ver más    <FontAwesomeIcon icon={faArrowRight} />
                    </Anchor>


                </div>



            )}


        </div>
    );
}
