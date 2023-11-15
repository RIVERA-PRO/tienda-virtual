import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import 'swiper/swiper-bundle.css';
import { Link as Anchor } from "react-router-dom";
import './AllProductos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import img from '../../images/3.png'
export default function AllProductos() {
    const [productos, setProductos] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const swiperRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]); // Almacena las categorías seleccionadas
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

    const [priceRange, setPriceRange] = useState({
        min: 10,
        max: 200000,
    });

    const filteredProducts = productos.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        item.price >= priceRange.min &&
        item.price <= priceRange.max &&
        (selectedCategories.length === 0 || selectedCategories.includes(item.categoria)) // Filtra por categoría
    );

    const allCategories = [...new Set(productos.map((item) => item.categoria))]; // Obtiene todas las categorías únicas

    const handleCategoryChange = (categoria) => {
        // Maneja el cambio en la selección de categorías
        if (selectedCategories.includes(categoria)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== categoria));
        } else {
            setSelectedCategories([...selectedCategories, categoria]);
        }
    };
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
                    title: 'Producto agregado al carrito',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error('Error al agregar el producto al carrito:', response.status);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar el producto al carrito',
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
        <div>

            <div className='fondoPage'>
                <Anchor to={`/`}>Inicio</Anchor>
                |
                <Anchor to={`/products`}>Productos</Anchor>
            </div>
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
                <div className='gridProducts'>
                    <div className='filtros'>
                        <fieldset className='filterproduct'>
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por título"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className='filtroPrecio'>
                            <h3>Filtrar por precio:</h3>
                            <input
                                type="range"
                                min="10"
                                max="200000"
                                value={priceRange.min}
                                onChange={(e) =>
                                    setPriceRange({ ...priceRange, min: e.target.value })
                                }
                            />
                            <input
                                type="range"
                                min="10"
                                max="200000"
                                value={priceRange.max}
                                onChange={(e) =>
                                    setPriceRange({ ...priceRange, max: e.target.value })
                                }
                            />
                            <div className="price-range-labels">
                                <span>Min {priceRange.min} / </span>
                                <span>Max {priceRange.max}</span>
                            </div>
                        </fieldset>
                        <fieldset className='filtroCategoria' >
                            <h3>Filtrar por categoría:</h3>
                            {allCategories.map((category) => (
                                <label key={category}>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    {category}
                                </label>
                            ))}
                        </fieldset>
                    </div>
                    <div className='productosFiltrados'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <div className='cardProduct'>
                                    <SwiperSlide id={""}>
                                        <div className='cardScroll'>


                                            <Anchor to={`/producto/${item._id}`}>
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
                                                <h3>{item.title.slice(0, 25)}</h3>
                                                <p>{item.description.slice(0, 50)}...</p>
                                                <div className='deFlexbtns'>
                                                    <h4>$ {item.price}</h4>
                                                    <button className="cart" onClick={() => handleAddToCart(item)}>
                                                        <FontAwesomeIcon icon={faShoppingCart} />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron resultados.</p>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}
