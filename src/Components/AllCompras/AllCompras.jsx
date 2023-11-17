import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllCompras.css'


import { Link as Anchor } from "react-router-dom";

import LoadingCarrito from '../LoadingCarrito/LoadingCarrito';

export default function AllCompras() {
    const [compras, setCompras] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userData, setUserData] = useState(null);
    const [compraselected, setCompraSelected] = useState('');
    const updateUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    };
    useEffect(() => {
        updateUserData();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');

        axios
            .get(`http://localhost:8080/compra`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setCompras(response?.data?.compras);
                setShowSpiral(false);
                console.log(response?.data?.compras);
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);


    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (id) => {
        setModalOpen((prev) => ({
            ...prev,
            [id]: true,
        }));
    };

    const closeModal = (id) => {
        setModalOpen((prev) => ({
            ...prev,
            [id]: false,
        }));
    };



    if (compras.filter(item => item.user_id._id === userData?.user_id).length === 0) {
        return (
            <div>

                <div className='carrito'>
                    {showSpiral && <LoadingCarrito />}
                    {!showSpiral && (
                        <p className='nohay'>No hay compras realizadas</p>
                    )}
                </div>
            </div>
        )
    }




    return (
        <div>





            {showSpiral && <LoadingCarrito />}
            {!showSpiral && (

                <div className='comprasGrid'>

                    {compras
                        .filter((item) => item.user_id._id === userData?.user_id)
                        .map((item) => (







                            item?.products?.slice(0, 1).map((productos) => (
                                <div key={item?._id} className='cardCompra'>

                                    <img src={productos?.cover_photo} alt="" />
                                    <div className='cardCompraText'>
                                        <h3>{productos?.title}</h3>
                                        <div className='deFlexver'>
                                            <p>{productos?.categoria}</p>
                                            <h4>$ {productos?.price}</h4>
                                        </div>
                                        <button onClick={() => openModal(item._id)}>Detalles de la compra</button>
                                    </div>

                                    {modalOpen[item._id] && (
                                        <div className='modalCompra'>
                                            <div className='subModalCompra'>
                                                <span className='close' onClick={() => closeModal(item._id)}>x</span>
                                                <div className='textDetalles'>
                                                    <h4>N° Transaccion: {item.idTransaccion}</h4>
                                                    <h4>Total: {item.totalAmount}</h4>
                                                    <h4>Estado: {item.status}</h4>
                                                    <h4>Fecha: {new Date(item.createdAt).toLocaleString('es-ES')}</h4>
                                                </div>
                                                {
                                                    item?.products?.map((productos) => (
                                                        <div className='cardCompraModal'>
                                                            <img src={productos?.cover_photo} alt="" />
                                                            <div className='cardCompraText'>
                                                                <h3>{productos?.title}</h3>
                                                                <div className='deFlexver'>
                                                                    <p>{productos?.categoria}</p>
                                                                    <h4>$ {productos?.price}</h4>
                                                                </div>
                                                                <Anchor to={`/producto/${productos.publicacion_id}`}>
                                                                    Ver producto
                                                                </Anchor>
                                                            </div>


                                                        </div>
                                                    ))
                                                }
                                            </div>


                                        </div>
                                    )}


                                </div>
                            ))










                        ))


                    }
                </div>



            )}


        </div>

    );
}
