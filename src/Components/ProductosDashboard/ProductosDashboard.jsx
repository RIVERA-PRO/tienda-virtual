import React, { useState, useEffect } from 'react';
import './ProductosDashboard.css';
import { Link as Anchor } from "react-router-dom";
import axios from 'axios';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard'
import Swal from 'sweetalert2';
import './ProductosDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDelete } from '@fortawesome/free-solid-svg-icons';
export default function ProductosDashboard() {
    const [productos, setProductos] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredProducts = productos.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );





    const handleDeletePublicacion = async (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const result = await Swal.fire({
                title: '¿Estás seguro de que deseas eliminar este producto?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await fetch(`https://tiendavirtual-qleq.onrender.com/publicacion/${id}`, {
                    method: 'DELETE',
                    headers,
                });

                // Después de la eliminación con éxito, obtén la lista actualizada de productos
                const response = await axios.get('https://tiendavirtual-qleq.onrender.com/publicacion');

                // Actualiza el estado de productos con la lista actualizada
                setProductos(response.data.publicaciones);

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto Eliminado',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al eliminar el producto',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };





    return (
        <div className='dashboardGrid'>
            <NavbarDashboard />
            <section className='sectionDashboard'>
                {showSpiral &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='descripcion'>Id</th>
                                <th className='descripcion'>Titulo</th>
                                <th className='descripcion'>Precio</th>
                                <th className='descripcion'>Descripción</th>
                                <th>Categoria</th>
                                <th>Imagen 1</th>
                                <th>Imagen 2</th>
                                <th>Imagen 3</th>
                                <th>Imagen 4</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="noResult" colSpan="9">Cargando</td>
                            </tr>
                        </tbody>
                    </table>
                }
                {!showSpiral && (
                    <div>
                        <div className='deflex'>
                            <Anchor to={`/productos/crear`} id='crear'>Agregar</Anchor>
                            <input
                                className='filterText'
                                type="text"
                                placeholder="Buscar por título"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="table-container">
                            {filteredProducts.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Titulo</th>
                                            <th>Precio</th>
                                            <th>Descripción</th>
                                            <th>Categoria</th>
                                            <th>Imagen 1</th>
                                            <th>Imagen 2</th>
                                            <th>Imagen 3</th>
                                            <th>Imagen 4</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item?._id}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.price}</td>
                                                <td>{item?.description}</td>
                                                <td>{item?.categoria}</td>
                                                <td><img src={item?.cover_photo} alt="" /></td>
                                                <td><img src={item?.cover_photo2} alt="" /></td>
                                                <td><img src={item?.cover_photo3} alt="" /></td>
                                                <td><img src={item?.cover_photo4} alt="" /></td>
                                                <td>
                                                    <span
                                                        className="material-icons"
                                                        style={{ cursor: "pointer", color: "red" }}
                                                        onClick={() => handleDeletePublicacion(item._id)}
                                                    >
                                                        delete
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='descripcion'>Id</th>
                                            <th className='descripcion'>Titulo</th>
                                            <th className='descripcion'>Precio</th>
                                            <th className='descripcion'>Descripción</th>
                                            <th>Categoria</th>
                                            <th>Imagen 1</th>
                                            <th>Imagen 2</th>
                                            <th>Imagen 3</th>
                                            <th>Imagen 4</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="noResult" colSpan="9">No hay resultados</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
