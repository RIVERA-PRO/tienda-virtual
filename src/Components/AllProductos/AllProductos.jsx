import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import 'swiper/swiper-bundle.css';
import { Link as Anchor } from "react-router-dom";
import './AllProductos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
                setTimeout(() => {
                    setProductos(response.data.publicaciones);
                    setShowSpiral(false);
                }, 2000);
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    const [priceRange, setPriceRange] = useState({
        min: 1000,
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

    return (
        <div>

            <div className='fondo'>
                <img src={img} alt="" />
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
                                min="1000"
                                max="200000"
                                value={priceRange.min}
                                onChange={(e) =>
                                    setPriceRange({ ...priceRange, min: e.target.value })
                                }
                            />
                            <input
                                type="range"
                                min="1000"
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
                        {filteredProducts.map((item) => (
                            <div className='cardProduct'>
                                <SwiperSlide id={""}>
                                    <Anchor className='cardScroll' to={`/producto/${item._id}`}>
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
                                            <SwiperSlide>
                                                <img src={item?.cover_photo} alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src={item?.cover_photo2} alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src={item?.cover_photo3} alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src={item?.cover_photo4} alt="" />
                                            </SwiperSlide>
                                        </Swiper>
                                        <div className='cardText'>
                                            <h3>{item.title.slice(0, 25)}</h3>
                                            <p>{item.description.slice(0, 50)}...</p>
                                            <h4>$ {item.price}</h4>
                                        </div>
                                    </Anchor>
                                </SwiperSlide>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
