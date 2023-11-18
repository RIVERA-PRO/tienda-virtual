import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'
import 'react-responsive-modal/styles.css'; // Importa los estilos de react-responsive-modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import LoadingDetail from "../LoadingDetail/LoadingDetail";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link as Anchor } from "react-router-dom";
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';
import axios from 'axios';
import wpp from '../../images/wpp.png'
export default function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState(null);
    const swiperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    SwiperCore.use([Navigation, Pagination, Autoplay]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };

                const response = await fetch(`https://tiendavirtual-qleq.onrender.com/publicacion/${id}`, headers);
                if (response.ok) {
                    const data = await response.json();
                    setProducto(data.publicacion);
                    setLoading(false);
                    console.log(data.publicacion);
                } else {
                    console.error('Error al obtener los datos de la publicación:', response.status);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al obtener los datos de la publicación:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const images = [producto?.cover_photo, producto?.cover_photo2, producto?.cover_photo3, producto?.cover_photo4].filter(image => !!image);
    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const productData = {

                title: producto.title,
                categoria: producto.categoria,
                description: producto.description,
                price: producto.price,
                cover_photo: producto.cover_photo,
                publicacion_id: producto._id,
            };

            const response = await fetch(`https://tiendavirtual-qleq.onrender.com/carrito/${producto._id}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(productData),

            });

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

    const handleWhatsappMessage = () => {
        const phoneNumber = '3875683101'; // Reemplaza con el número de teléfono al que deseas enviar el mensaje

        const message = `¡Hola! 🌟 Estoy interesado en el producto:

${producto.categoria} - ${producto.title} - $${producto.price}.
        
Producto:(https://tienda-virtual-jet.vercel.app/producto/${producto._id})
        
¿Podrías proporcionarme más información? 🤔`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

    };


    return (
        <div className="detail-contain">
            {loading ? (
                <LoadingDetail />
            ) : producto ? (

                <>
                    <div className="detail">

                        <div className="deFleximg">
                            <div className="imgDivs">
                                {images.map((image, index) => (

                                    <img src={image} alt="" onClick={() => openModal(index)} />

                                ))}
                            </div>
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
                                id={"swiperDetail"}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index} id={"swiperImgDetail"} onClick={() => openModal(index)}>
                                        <img src={image} alt="" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>
                        <div className="deColumText">
                            <h1>{producto.title}</h1>
                            <Anchor to={`/products`}>
                                <FontAwesomeIcon icon={faStar} /> Categoria / {producto.categoria}
                            </Anchor>
                            <h2>$ {producto.price}</h2>


                            <div className="btns_final">

                                <button className="agregar" onClick={handleAddToCart}>
                                    Agregar al carrito
                                </button>


                                <button className="consultar" onClick={handleWhatsappMessage}>
                                    Consultar al
                                    <img src={wpp} alt="" />
                                </button>

                            </div>
                            <div className="detalles">
                                <div>
                                    <h3>Descripción</h3>
                                    <p className="description">{producto.description}</p>
                                </div>

                            </div>
                        </div>


                        <Modal open={isModalOpen} onClose={closeModal} center>
                            <img src={images[currentImageIndex]} alt="" className="modal-image" /> {/* Agrega una clase para la imagen del modal */}
                        </Modal>
                    </div>

                </>
            ) : (
                <p>No se encontró la publicación.</p>
            )}
        </div>
    );
}
