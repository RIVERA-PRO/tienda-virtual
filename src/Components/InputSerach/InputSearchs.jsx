import React, { useState, useEffect } from "react";
import "./InputSearchs.css";

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de búsqueda
import axios from 'axios';

export default function InputSearchs() {
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
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="fondo-input">
            <div className="search-container">
                <div className="inputSearch" onClick={openModal}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <div className="input">
                        Buscar propiedad... {/* Cambio de "ejercicio" a "propiedad" */}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="modalSearch">
                    <div className="modalSearch-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="inputSearch" onClick={openModal}>
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="input"
                            />
                            {showResults && (
                                <div className="modal">
                                    {filteredProductos.map((producto) => ( // Cambio de "ejercicio" a "producto"
                                        <div key={producto._id}>
                                            <button className="btn-music" onClick={() => handleButtonClick(producto)}></button>
                                            <Link to={`/producto/${producto._id}`} onClick={closeModal}>{/* Cambio de "/ejercicios/" a "/productos/" */}
                                                <FontAwesomeIcon icon={faSignOutAlt} />
                                                <p>{producto.title} - {producto.categoria}</p> {/* Cambio de "ejercicio" a "producto" */}
                                            </Link>
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
