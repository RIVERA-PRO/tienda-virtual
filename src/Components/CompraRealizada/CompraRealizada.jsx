import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CompraRealizada.css'
import Swal from 'sweetalert2';
import axios from 'axios';
export default function CompraRealizada() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Extraer los parámetros de la consulta
    const idTransaccion = searchParams.get('collection_id');
    const status = searchParams.get('status');

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
            publicacion_id: item.publicacion_id,

            title: item.title,
            price: item.price,
            categoria: item.categoria,
            cover_photo: item.cover_photo,

        }));
        console.log(productsDetails[0].publicacion_id)


        console.log("Detalles de productos en el frontend:", productsDetails);

        const compra = {
            products: productsDetails,
            totalAmount: totalPrice,
            status: status,
            idTransaccion: idTransaccion,
        };

        axios
            .post("https://tiendavirtual-qleq.onrender.com/compra", compra, { headers })
            .then(res => {
                const initPoint = res?.data?.response?.body?.init_point;
                console.log(status);
                if (initPoint && status === 'approved') {
                    // Ejecuta handleBuy y luego muestra la alerta
                    handleBuy();

                    Swal.fire({
                        icon: 'success',
                        title: '¡Compra Exitosa!',
                        text: 'Tu compra ha sido aprobada con éxito.',
                    });
                } else {
                    console.error('La propiedad init_point no está definida en la respuesta o el status no es "approved".');
                    // Manejar el error de alguna manera, por ejemplo, redirigiendo a una página de error.
                }
            })
            .catch(error => {
                console.error('Error al realizar la compra:', error);
                // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
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
            <h1>Compra Realizada</h1>
            <p>Collection ID: {idTransaccion}</p>
            <p>Status: {status}</p>
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



                                        </div>

                                    </div>




                                ))

                            }
                            <button button className="agregar" onClick={handleBuy}>Finalizar Compra</button>
                            <h3>$ {totalPrice}</h3>
                        </div>


                    </div>
                )}
            </div>
        </div >
    );
};

