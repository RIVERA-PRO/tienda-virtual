import React, { useState, useEffect, useRef } from 'react';

import { Link as Anchor } from "react-router-dom";
import axios from 'axios';
import './ProductosHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Swal from 'sweetalert2';
import 'swiper/swiper-bundle.css';
export default function ProductosHome() {
    const [productos, setProductos] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const swiperRef = useRef(null);
    SwiperCore.use([Navigation, Pagination, Autoplay]);


    useEffect(() => {
        axios
            .get('https://tiendavirtual-qleq.onrender.com/publicacion')
            .then((response) => {

                setProductos(response.data.publicaciones);
                setShowSpiral(false);


            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);



    const images = [productos?.cover_photo, productos?.cover_photo2, productos?.cover_photo3, productos?.cover_photo4].filter(image => !!image);


    const handleAddToCart = async (item) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const productData = {

                title: item.title,
                categoria: item.categoria,
                description: item.description,
                price: item.price,
                cover_photo: item.cover_photo,
                publicacion_id: item._id,
            };


            const response = await fetch(`https://tiendavirtual-qleq.onrender.com/carrito/${item._id}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(productData),

            });
            console.log(productData)
            if (response.ok) {
                // Producto agregado con éxito

                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado ',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error('Error al agregar el producto al carrito:', response.status);
                Swal.fire({
                    icon: 'error',
                    title: 'Debes iniciar sesion',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar el producto al carrito',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className='productosHome'>


            {showSpiral &&
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                    autoplay={{ delay: 3000 }} // Cambia el valor de 'delay' según tus preferencias

                    onSwiper={(swiper) => {
                        console.log(swiper);
                        swiperRef.current = swiper;
                    }}
                    id={"swiper_container_scroll"}
                >
                    <SwiperSlide id={"swiperCardScroll"} >
                        <div className='cardloadin'>

                        </div>
                    </SwiperSlide>


                    <SwiperSlide id={"swiperCardScroll"} >
                        <div className='cardloadin'>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide id={"swiperCardScroll"} >
                        <div className='cardloadin'>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide id={"swiperCardScroll"} >
                        <div className='cardloadin'>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide id={"swiperCardScroll"} >
                        <div className='cardloadin'>

                        </div>
                    </SwiperSlide>


                </Swiper>
            }
            {!showSpiral && (

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                    autoplay={{ delay: 3000 }} // Cambia el valor de 'delay' según tus preferencias

                    onSwiper={(swiper) => {
                        console.log(swiper);
                        swiperRef.current = swiper;
                    }}
                    id={"swiper_container_scroll"}
                >



                    {
                        productos.map((item) => (
                            <SwiperSlide key={item._id} id={"swiperCardScroll"}>
                                <div className='cardScroll'>


                                    <Anchor to={`producto/${item._id}`}>
                                        <Swiper
                                            effect={'coverflow'}
                                            grabCursor={true}
                                            loop={true}
                                            slidesPerView={'auto'}
                                            coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
                                            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                                            autoplay={{ delay: 3000 }}
                                            pagination={{ clickable: true }}
                                            onSwiper={(swiper) => {
                                                console.log(swiper);
                                                swiperRef.current = swiper;
                                            }}

                                        >
                                            {[item.cover_photo, item.cover_photo2, item.cover_photo3, item.cover_photo4].map((image, index) => (
                                                image && (
                                                    <SwiperSlide key={index} >
                                                        <img src={image} alt="" />
                                                    </SwiperSlide>
                                                )
                                            ))}
                                        </Swiper>
                                    </Anchor>
                                    <div className='cardText'>
                                        <h3>{item.title.slice(0, 22)}</h3>
                                        <p>{item.description.slice(0, 50)}</p>
                                        <div className='deFlexbtns'>
                                            <h4>$ {item.price}</h4>
                                            <button className="cart" onClick={() => handleAddToCart(item)}>
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }






                </Swiper>
            )}

        </div>
    );
}
