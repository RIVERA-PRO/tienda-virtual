import React, { useState, useEffect } from "react";
import "./InputSearchMobile.css";

import { Link as Anchor } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de búsqueda
import axios from 'axios';

export default function InputSearchMobile() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('https://tiendavirtual-qleq.onrender.com/publicacion')
            .then(response => {
                const productos = response.data.publicaciones; // Cambio de "ejercicios" a "productos"
                setProductos(productos);
                console.log(productos);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    const handleButtonClick = (producto) => { // Cambio de "ejercicio" a "producto"
        console.log(producto);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const results = productos.filter((producto) => { // Cambio de "ejercicio" a "producto"
            return (
                producto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredProductos(results);
        setShowResults(searchTerm !== "");
        setNoResults(searchTerm !== "" && results.length === 0);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(!modalOpen);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="InputSearchMobileContain">



            <FontAwesomeIcon icon={faSearch} className="inputSearchMobile" onClick={openModal} />


            {modalOpen && (
                <div className="modalSearchMobileContain">
                    <div className="modalSearchMobile">
                        <span className="close" onClick={closeModal}>X</span>
                        <div className="inputSearschMobile" >
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="input"
                            />
                            {showResults && (
                                <div className="modalMobile">
                                    {filteredProductos.map((producto) => (
                                        <div key={producto._id}>

                                            <Anchor to={`/producto/${producto._id}`} onClick={closeModal}>
                                                <FontAwesomeIcon icon={faSignOutAlt} />
                                                <p>{producto.title} - {producto.categoria}</p>
                                            </Anchor>
                                        </div>
                                    ))}
                                    {noResults && <p>No se encontraron resultados.</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
