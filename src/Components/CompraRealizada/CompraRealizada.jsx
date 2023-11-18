import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CompraRealizada.css'
import Swal from 'sweetalert2';
import axios from 'axios';

export default function CompraRealizada() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Extraer los parámetros de la consulta
    const idTransaccion = searchParams.get('collection_id');
    const status = searchParams.get('status');
    const [compras, setCompras] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

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
        handleBuy();
    }, [userData]);

    useEffect(() => {
        axios
            .get(`https://tiendavirtual-qleq.onrender.com/carrito`)
            .then((response) => {
                setProducts(response?.data?.producs);
                setShowSpiral(false);
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    const handleBuy = () => {
        if (!userData) {
            // Asegurar que userData esté definido antes de continuar
            return;
        }

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const userProducts = products.filter((item) => item.user_id._id === userData?.user_id);

        const productsDetails = userProducts.map((item) => ({
            publicacion_id: item && item.publicacion_id,
            title: item && item.title,
            price: item && item.price,
            categoria: item && item.categoria,
            cover_photo: item && item.cover_photo,
        }));

        const compra = {
            products: productsDetails,
            totalAmount: totalPrice,
            status: status,
            idTransaccion: idTransaccion,
        };

        axios
            .get(`https://tiendavirtual-qleq.onrender.com/compra/`, { headers })
            .then((verificacionRes) => {
                const transaccionesExisten = verificacionRes?.data?.compras?.some(
                    (compra) => compra.idTransaccion === idTransaccion
                );

                if (transaccionesExisten) {
                    console.log('La transacción ya existe en la base de datos. No se creará nuevamente.');
                    return;
                }

                axios
                    .post("https://tiendavirtual-qleq.onrender.com/compra", compra, { headers })
                    .then((res) => {
                        console.log('Respuesta del servidor:', res?.data);

                        const status = res?.data?.response?.status;
                        console.log(status);
                        if (status === 'approved') {
                            setTotalPrice(0);
                            setProducts([]);
                            setShowSpiral(true);

                            Swal.fire({
                                icon: 'success',
                                title: '¡Compra Exitosa!',
                                text: `N° de transaccion ${idTransaccion}`,
                            });
                            navigate('/')
                        } else {
                            console.error('La transacción no fue aprobada.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error al realizar la compra:', error);
                    });
            })
            .catch((verificacionError) => {
                console.error('Error al verificar la transacción:', verificacionError);
            });
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [products]);

    const calculateTotalPrice = () => {
        const total = products
            .filter((item) => item.user_id._id === userData?.user_id)
            .reduce((accumulator, product) => {
                return accumulator + product.price;
            }, 0);
        setTotalPrice(total);
    };

    return (
        <div>
            {/* <h1>Compra Realizada</h1>
            <p>Collection ID: {idTransaccion}</p>
            <p>Status: {status}</p> */}
            {/* <div className='carrito'>
                {showSpiral && <div>cargando</div>}
                {!showSpiral && (
                    <div className='carritoGrid'>
                        <div className='cardsCarrito'>
                            {products
                                .filter((item) => item.user_id._id === userData?.user_id)
                                .map((item) => (
                                    <div key={item._id} className='cardCarrito'>
                                        <img src={item.cover_photo} alt="" />
                                        <div className='cardCarritoText'>
                                            <h3>{item.title}</h3>
                                            <div className='deFlexver'>
                                                <p>{item.categoria}</p>
                                                <h4>$ {item.price}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            <button className="agregar" onClick={handleBuy}>Finalizar Compra</button>
                            <h3>$ {totalPrice}</h3>
                        </div>
                    </div>
                )}
            </div> */}
        </div>
    );
};
