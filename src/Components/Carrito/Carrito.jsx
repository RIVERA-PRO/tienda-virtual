import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carrito.css';
import Swal from 'sweetalert2';
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function Carrito() {
    const [products, setProducts] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
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
    useEffect(() => {
        axios
            .get(`https://tiendavirtual-qleq.onrender.com/carrito`)
            .then((response) => {
                const groupedProducts = groupProductsByPublicacionId(response?.data?.producs);
                setProducts(groupedProducts);
                setShowSpiral(false);
                calculateTotalPrice(groupedProducts);
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    const groupProductsByPublicacionId = (products) => {
        const groupedProducts = {};
        products.forEach((product) => {
            const publicacionId = product.publicacion_id;
            if (!groupedProducts[publicacionId]) {
                groupedProducts[publicacionId] = {
                    ...product,
                    quantity: 1,
                };
            } else {
                groupedProducts[publicacionId].quantity += 1;
            }
        });
        return Object.values(groupedProducts);
    };

    const calculateTotalPrice = (products) => {
        const total = products.reduce((accumulator, product) => {
            return accumulator + product.price * product.quantity;
        }, 0);
        setTotalPrice(total);
    };

    const handleDeleteProduct = async (productId) => {
        // Realiza una solicitud DELETE al servidor para eliminar el producto por su ID
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {

            await axios.delete(`https://tiendavirtual-qleq.onrender.com/carrito/${productId}`, { headers });

            // Actualiza la lista de productos excluyendo el producto eliminado
            const updatedProducts = products.filter((product) => product._id !== productId);
            setProducts(updatedProducts);
            calculateTotalPrice(updatedProducts); // Recalcula el precio total

            console.log(productId)
            Swal.fire({
                icon: 'success',
                title: 'Producto eliminado',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al eliminar el producto',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (products.filter(item => item.user_id._id === userData?.user_id).length === 0) {
        return (
            <div className='carrito'>
                {showSpiral && <div>cargando</div>}
                {!showSpiral && (
                    <div >No hay productos</div>
                )}
            </div>
        )
    }






    return (
        <div className='carrito'>
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
                                        <p>{item.categoria}</p>

                                        <p>Cantidad: {item.quantity}</p>

                                        <Anchor to={`/producto/${item.publicacion_id}`}>Ver</Anchor>
                                        <button onClick={() => handleDeleteProduct(item._id)}>
                                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                                        </button>
                                    </div>

                                </div>




                            ))

                        }
                    </div>
                    {products
                        .filter((item) => item.user_id._id === userData?.user_id)

                        && <p>Precio Total: {totalPrice}</p>
                    }

                </div>
            )}


        </div>
    );
}
