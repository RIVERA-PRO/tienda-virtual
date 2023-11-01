import { React, useEffect, useRef } from 'react'
import './Hero.css'
import img1 from '../../images/1.png'
import img2 from '../../images/2.png'
import img3 from '../../images/3.png'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
export default function Hero() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const swiperRef = useRef(null);
    SwiperCore.use([Navigation, Pagination, Autoplay]);



    return (
        <div className='heroContain'>




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
                id={"swiper_container_img"}
            >

                <SwiperSlide id={"swiperImg"} >
                    <img src={img2} alt="" />
                </SwiperSlide>
                <SwiperSlide id={"swiperImg"} >
                    <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide id={"swiperImg"} >
                    <img src={img3} alt="" />
                </SwiperSlide>
            </Swiper>


        </div>
    )
}
