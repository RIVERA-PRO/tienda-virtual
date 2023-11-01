import React, { useState, useEffect } from "react";
import "./InputSearchs.css";

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de búsqueda
import axios from 'axios';
export default function InputSearchs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEjercicios, setFilteredEjercicios] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);

    useEffect(() => {
        axios.get('https://fitness-ue8o.onrender.com/ejercicios')
            .then(response => {
                const ejercicios = response.data.ejercicios;
                setEjercicios(ejercicios);
                console.log(ejercicios)
            })
            .catch(error => {
                console.error('Error al obtener los ejercicios:', error);
            });
    }, []);

    const handleButtonClick = (ejercicio) => {
        console.log(ejercicio);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const results = ejercicios.filter((ejercicio) => {
            return (
                ejercicio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ejercicio.categoria.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredEjercicios(results);
        setShowResults(searchTerm !== "");
        setNoResults(searchTerm !== "" && results.length === 0);
    };
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="fondo-input">
            <div className="search-container">
                <div className="inputSearch" onClick={openModal}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar propiedad..."
                        className="input"
                    />
                </div>
            </div>

            {modalOpen && (
                <div className="modalSearch" >
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
                                    {filteredEjercicios.map((ejercicio) => (
                                        <div key={ejercicio._id}>
                                            <button className="btn-music" onClick={() => handleButtonClick(ejercicio)}></button>
                                            <Link to={`/ejercicios/${ejercicio._id}`}>
                                                <FontAwesomeIcon icon={faSignOutAlt} />
                                                <p>{ejercicio.title} - {ejercicio.categoria}</p>
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
