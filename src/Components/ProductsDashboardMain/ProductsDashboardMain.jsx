import React, { useState, useEffect } from 'react';


import { Link as Anchor } from "react-router-dom";
import axios from 'axios';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard'
import Swal from 'sweetalert2';
import './ProductsDashboardMain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDelete } from '@fortawesome/free-solid-svg-icons';
export default function ProductsDashboardMain() {
    const [productos, setProductos] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedTitle, setEditedTitle] = useState(null);
    const [editedPrice, setEditedPrice] = useState(null);
    const [editedDescription, setEditedDescription] = useState(null);
    const [editedCategoria, setEditedCategoria] = useState(null);
    const [editedCover_photo, setEditedCover_photo] = useState(null);
    const [editedCover_photo2, setEditedCover_photo2] = useState(null);
    const [editedCover_photo3, setEditedCover_photo3] = useState(null);
    const [editedCover_photo4, setEditedCover_photo4] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    useEffect(() => {
        axios
            .get('https://tiendavirtual-qleq.onrender.com/publicacion')
            .then((response) => {

                setProductos(response.data.publicaciones.slice(0, 5).reverse());
                setShowSpiral(false);


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



    const handleEditUsuario = (id, title, price, description, categoria, cover_photo, cover_photo2, cover_photo3, cover_photo4) => {
        setSelectedUserId(id);
        setEditedTitle(title);
        setEditedPrice(price);
        setEditedDescription(description);
        setEditedCategoria(categoria);
        setEditedCover_photo(cover_photo);
        setEditedCover_photo2(cover_photo2);
        setEditedCover_photo3(cover_photo3);
        setEditedCover_photo4(cover_photo4);
    };
    const handleCancelEdit = () => {
        setEditedTitle(null);
        setSelectedUserId(null);
    };

    const handleSaveEdit = async () => {
        if (selectedUserId !== null && editedPrice !== null) {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            try {
                await axios.put(`https://tiendavirtual-qleq.onrender.com/publicacion/${selectedUserId}`, {
                    title: editedTitle,
                    price: editedPrice,
                    description: editedDescription,
                    categoria: editedCategoria,
                    cover_photo: editedCover_photo,
                    cover_photo2: editedCover_photo2,
                    cover_photo3: editedCover_photo3,
                    cover_photo4: editedCover_photo4


                }, {
                    headers,
                });

                const updatedProducts = productos.map((usuario) => {
                    if (usuario._id === selectedUserId) {
                        return { ...usuario, is_admin: editedPrice };
                    }
                    return usuario;
                });

                setProductos(updatedProducts);
                setEditedTitle(null);
                setSelectedUserId(null);
                const response = await axios.get('https://tiendavirtual-qleq.onrender.com/publicacion');
                setProductos(response.data.publicaciones);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Rol de usuario actualizado',
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al actualizar el rol de usuario',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (


        <section className='tableMain'>
            <h3 className='title_dashboard'>Ultimos Productos</h3>
            {showSpiral &&
                <div className="table-container">


                    <table className="table">
                        <thead>
                            <tr>
                                <th className='descripcion'>Id</th>
                                <th className='descripcion'>Titulo</th>
                                <th className='descripcion'>Precio</th>
                                <th>Categoria</th>
                                <th>Imagen 1</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                            </tr>
                            <tr>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                            </tr>
                            <tr>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                            </tr>
                            <tr>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                            </tr>
                            <tr>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                                <td className="noResult" >cargando</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            {!showSpiral && (
                <div>


                    <div className="table-container">
                        {productos.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Titulo</th>
                                        <th>Precio</th>

                                        <th>Categoria</th>
                                        <th>Imagen 1</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item?._id}</td>
                                            <td>{item?.title}</td>
                                            <td>{item?.price}</td>

                                            <td>{item?.categoria}</td>
                                            <td><img src={item?.cover_photo} alt="" /></td>


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

    );
}
