import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carrito.css';

import Swal from 'sweetalert2';
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingCarrito from '../LoadingCarrito/LoadingCarrito';
import wpp from '../../images/wpp.png'
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
                setProducts(response?.data?.producs);
                setShowSpiral(false);
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);


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
            <div>
                <div className='fondoPage'>
                    <Anchor to={`/`}>Inicio</Anchor>
                    |
                    <Anchor to={`/carrito`}>Carrito</Anchor>
                </div>
                <div className='carrito'>
                    {showSpiral && <LoadingCarrito />}
                    {!showSpiral && (
                        <p className='nohay'>No hay productos</p>
                    )}
                </div>
            </div>
        )
    }



    const handleBuy = () => {
        console.log("products en el frontend:", products);

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Filtra los productos del usuario actual
        const userProducts = products.filter((item) => item.user_id._id === userData?.user_id);

        // Crea una lista de detalles completos de los productos
        const productsDetails = userProducts.map((item) => ({
            id: item._id,
            title: item.title,
            price: item.price,
            categoria: item.categoria,
            link: `https://tiendavirtual-qleq.onrender.com/producto/${item._id}`

        }));

        console.log("Detalles de productos en el frontend:", productsDetails);

        // En lugar de enviar solo productIds, envía los detalles completos de los productos
        axios
            .post("https://tiendavirtual-qleq.onrender.com/buy", { products: productsDetails }, { headers })
            .then(res => window.location.href = res.data.response.body.init_point);
    };


    const handleWhatsappMessage = () => {
        const phoneNumber = '3875683101'; // Reemplaza con el número de teléfono al que deseas enviar el mensaje

        // Crea una lista de detalles completos de los productos en el carrito
        const cartDetails = products
            .filter((item) => item.user_id._id === userData?.user_id)
            .map((item) => (
                `
*${item.title}* - ${item.categoria}
Precio: $${item.price}
Producto:(${`https://tienda-virtual-jet.vercel.app/producto/${item.publicacion_id}`})
---`
            ));
        const message = `¡Hola! 🌟 Estoy interesado en los siguientes productos en mi carrito:
    
    ${cartDetails.join('')}
Total:$ ${totalPrice}
¿Podrías proporcionarme más información o ayudarme con la compra? 🛍️`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <div>
            <div className='fondoPage'>
                <Anchor to={`/`}>Inicio</Anchor>
                |
                <Anchor to={`/carrito`}>Carrito</Anchor>
            </div>
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
                                            <div className='deFlexver'>
                                                <p>{item.categoria}</p>
                                                <h4>$ {item.price}</h4>
                                            </div>


                                            <div className='deFlexver'>
                                                <Anchor to={`/producto/${item.publicacion_id}`}>Ver producto</Anchor>
                                                <button onClick={() => handleDeleteProduct(item._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>

                                    </div>




                                ))

                            }
                        </div>
                        {products
                            .filter((item) => item.user_id._id === userData?.user_id)

                            && <div className='card_pago'>
                                <h2>Resumen de Compra</h2>
                                <div className='deFlexTotal'>
                                    <h3>Total: </h3>
                                    <h3>$ {totalPrice}</h3>
                                </div>
                                <button className="agregar" onClick={handleBuy}>Finalizar Compra</button>
                                <button className="consultar" onClick={handleWhatsappMessage}>
                                    Consultar al
                                    <img src={wpp} alt="" />
                                </button>


                            </div>
                        }

                    </div>
                )}


            </div>
        </div>
    );
}
