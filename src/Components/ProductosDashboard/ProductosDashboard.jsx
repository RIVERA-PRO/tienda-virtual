import React, { useState, useEffect } from 'react';
import './ProductosDashboard.css';

import { Link as Anchor } from "react-router-dom";
import axios from 'axios';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard'
import Swal from 'sweetalert2';
import './ProductosDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';


export default function ProductosDashboard() {
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
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        axios
            .get('https://tiendavirtual-qleq.onrender.com/publicacion')
            .then((response) => {

                setProductos(response.data.publicaciones);
                setShowSpiral(false);
                setExcelData(response.data.publicaciones);

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
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Productos');
        XLSX.writeFile(wb, 'productos.xlsx');
    };
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de Productos', 14, 10);

        const data = productos.map((item) => [item._id, item.title, item.price, item.description, item.categoria]);

        doc.autoTable({
            head: [['Id', 'Titulo', 'Precio', 'Descripción', 'Categoría']],
            body: data,
        });

        doc.save('productos.pdf');
    };


    return (
        <div className='dashboardGrid'>
            <NavbarDashboard />
            <section className='sectionDashboard'>
                <div className='title_Dash'>
                    <FontAwesomeIcon icon={faShoppingBag} className='iconDashTitle' />
                    <h2 >Productos {productos?.length}</h2>
                </div>
                {showSpiral &&
                    <div className="table-container">


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
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                </tr>
                                <tr>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                </tr>
                                <tr>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                </tr>
                                <tr>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                </tr>
                                <tr>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                    <td className="noResult" >Cargando</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                {!showSpiral && (
                    <div>
                        <div className='deflex'>
                            <Anchor to={`/productos/crear`} id='crear'>Agregar</Anchor>
                            <div className='deFlexExport'>
                                <button onClick={exportToExcel} className="excel-button">
                                    <FontAwesomeIcon icon={faFileExcel} />
                                </button>

                                <button onClick={exportToPDF} className="pdf-button">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                </button>
                            </div>
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
                                                    <span
                                                        className="material-icons"
                                                        style={{ cursor: "pointer", color: "#0074E4", marginLeft: "10px" }}
                                                        onClick={() => handleEditUsuario(item._id, item.title, item.price, item.description, item.categoria, item.cover_photo, item.cover_photo2, item.cover_photo3, item.cover_photo4)}
                                                    >
                                                        edit
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {selectedUserId !== null && editedTitle !== null && (
                                        <div className='modal-edit'>
                                            <div className='submodal-edit'>
                                                <div className='inputs'>
                                                    <label>Titulo</label>
                                                    <input
                                                        value={editedTitle}
                                                        onChange={(e) => setEditedTitle(e.target.value)}
                                                    />
                                                </div>
                                                <div className='inputs'>
                                                    <label>Precio</label>
                                                    <input
                                                        value={editedPrice}
                                                        onChange={(e) => setEditedPrice(e.target.value)}
                                                    ></input>
                                                </div>

                                                <div className='inputs'>
                                                    <label>Categoria</label>
                                                    <select
                                                        required
                                                        value={editedCategoria}
                                                        onChange={(e) => setEditedCategoria(e.target.value)}
                                                    >

                                                        <option value="Zapatilla">Zapatilla</option>
                                                        <option value="Pantalon">Pantalon</option>
                                                        <option value="Remera">Remera</option>
                                                    </select>
                                                </div>

                                                <div className='inputsDescription'>
                                                    <label>Descripcion</label>
                                                    <textarea
                                                        value={editedDescription}
                                                        onChange={(e) => setEditedDescription(e.target.value)}
                                                    ></textarea>
                                                </div>
                                                <div className='inputs'>
                                                    <label>Foto de portada</label>
                                                    <input
                                                        value={editedCover_photo}
                                                        onChange={(e) => setEditedCover_photo(e.target.value)}
                                                    ></input>
                                                </div>

                                                <div className='inputs'>
                                                    <label>Imagen 2</label>
                                                    <input
                                                        value={editedCover_photo2}
                                                        onChange={(e) => setEditedCover_photo2(e.target.value)}
                                                    ></input>
                                                </div>

                                                <div className='inputs'>
                                                    <label>Imagen 3</label>
                                                    <input
                                                        value={editedCover_photo3}
                                                        onChange={(e) => setEditedCover_photo3(e.target.value)}
                                                    ></input>
                                                </div>
                                                <div className='inputs'>
                                                    <label>Imagen 4</label>
                                                    <input
                                                        value={editedCover_photo4}
                                                        onChange={(e) => setEditedCover_photo4(e.target.value)}
                                                    ></input>
                                                </div>

                                                <div className='deFlexBtns'>
                                                    <button onClick={handleSaveEdit} style={{ cursor: "pointer", backgroundColor: "red" }}>Guardar</button>
                                                    <button onClick={() => handleCancelEdit()} style={{ cursor: "pointer", backgroundColor: "#0074E4" }} >Cancelar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
