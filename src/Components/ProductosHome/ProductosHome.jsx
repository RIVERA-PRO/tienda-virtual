import React, { useState, useEffect, useRef } from 'react';

import { Link as Anchor } from "react-router-dom";
import axios from 'axios';
import './ProductosHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDelete } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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
                setTimeout(() => {
                    setProductos(response.data.publicaciones);
                    setShowSpiral(false);

                }, 2000);
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);






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
                            <SwiperSlide id={"swiperCardScroll"} >
                                <Anchor className='cardScroll' to={`/producto/${item._id}`}>

                                    <Swiper
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        loop={true}
                                        slidesPerView={'auto'}
                                        coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
                                        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                                        autoplay={{ delay: 3000 }}
                                        pagination={{ clickable: true, }}
                                        onSwiper={(swiper) => {
                                            console.log(swiper);
                                            swiperRef.current = swiper;
                                        }}

                                    >
                                        <SwiperSlide  >
                                            <img src={item?.cover_photo} alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide  >
                                            <img src={item?.cover_photo2} alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide  >
                                            <img src={item?.cover_photo3} alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide  >
                                            <img src={item?.cover_photo4} alt="" />
                                        </SwiperSlide>

                                    </Swiper>

                                    <div className='cardText'>
                                        <h3>{item.title.slice(0, 30)}</h3>
                                        <p>{item.description.slice(0, 50)}...</p>
                                        <h4>$ {item.price}</h4>
                                    </div>
                                </Anchor>
                            </SwiperSlide>

                        ))
                    }


                </Swiper>
            )}

        </div>
    );
}
