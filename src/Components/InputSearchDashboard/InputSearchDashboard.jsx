import React, { useState } from "react";
import "./InputSearchDashboard.css";

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function InputSearchDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const enlaces = [
        { title: 'Productos', link: '/productos' },
        { title: 'Usuarios', link: '/usuarios' },
        { title: 'Compras', link: '/compras' }
    ];

    const handleButtonClick = (enlace) => {
        console.log(enlace);
        setModalOpen(false); // Cerrar el modal al hacer clic en un enlace
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        setModalOpen(searchTerm !== ""); // Abrir el modal solo si hay un término de búsqueda
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const filteredEnlaces = enlaces.filter((enlace) =>
        enlace.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fondo-input">
            <div className="search-container">
                <div className="inputSearchDashboard">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="input"
                    />
                    {modalOpen && (
                        <div className="modal">
                            {filteredEnlaces.length > 0 ? (
                                filteredEnlaces.map((enlace, index) => (
                                    <div key={index}>

                                        <Link to={enlace.link} onClick={closeModal}>
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <p>{enlace.title}</p>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No hay resultados.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
}
