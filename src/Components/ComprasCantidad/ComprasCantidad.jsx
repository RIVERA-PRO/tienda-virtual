import React, { useState, useEffect } from 'react';

import { Link as Anchor } from "react-router-dom";
import { faArrowRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function UsersCantidad() {
    const [loading, setLoading] = useState(true);
    const [compra, setCompra] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {

        fetch('https://tiendavirtual-qleq.onrender.com/compra')
            .then(response => response.json())
            .then(data => {

                setCompra(data?.compras);

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
                        <FontAwesomeIcon icon={faShoppingCart} className='iconDash' />
                        <div>
                            <h4>Compras</h4>
                            <h5> Cargando</h5>

                        </div>
                    </div>
                    <Anchor className='linea'>
                        ---
                    </Anchor>
                    <Anchor to='/compras' className='more'>
                        Ver más    <FontAwesomeIcon icon={faArrowRight} />
                    </Anchor>

                </div>

            ) : (
                <div className='cardDashboardCantidad'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={faShoppingCart} className='iconDash' />
                        <div>
                            <h4>Compras</h4>
                            <h3 className='title-cantidad'> {compra.length}</h3>

                        </div>
                    </div>
                    <Anchor className='linea'>
                        ---
                    </Anchor>
                    <Anchor to='/compras' className='more'>
                        Ver más    <FontAwesomeIcon icon={faArrowRight} />
                    </Anchor>


                </div>



            )}


        </div>
    );
}
