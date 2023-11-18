import React, { useState, useEffect } from 'react';

import { Link as Anchor } from "react-router-dom";
import axios from 'axios';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import PerfilDashboard from '../PerfilDashboard/PerfilDashboard'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
export default function AllComprasDashboard() {
    const [prductos, setUProductos] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedRol, setEditedRol] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [excelData, setExcelData] = useState([]);
    useEffect(() => {
        axios
            .get('https://tiendavirtual-qleq.onrender.com/compra')
            .then((response) => {

                setUProductos(response.data.compras);
                setShowSpiral(false);
                console.log(response.data.compras);

                setExcelData(response.data.compras);

            })
            .catch((error) => {
                console.error('Error al obtener los usuarios:', error);
            });
    }, []);

    const filteredUsuarios = prductos.filter((item) =>
        item.user_id.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteUsuario = async (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const result = await Swal.fire({
                title: '¿Estás seguro de que deseas eliminar este usuario?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await fetch(`https://tiendavirtual-qleq.onrender.com/users/${id}`, {
                    method: 'DELETE',
                    headers,
                });


                const response = await axios.get('https://tiendavirtual-qleq.onrender.com/users');


                setUProductos(response.data.users);

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario Eliminado',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al eliminar el usuario',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    const handleEditUsuario = (id, is_admin) => {
        setSelectedUserId(id);
        setEditedRol(is_admin);
    };
    const handleCancelEdit = () => {
        setEditedRol(null);
        setSelectedUserId(null);
    };

    const handleSaveEdit = async () => {
        if (selectedUserId !== null && editedRol !== null) {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            try {
                await axios.put(`https://tiendavirtual-qleq.onrender.com/users/${selectedUserId}`, {
                    is_admin: editedRol,
                }, {
                    headers,
                });

                const updatedUsuarios = prductos.map((usuario) => {
                    if (usuario._id === selectedUserId) {
                        return { ...usuario, is_admin: editedRol };
                    }
                    return usuario;
                });

                setUProductos(updatedUsuarios);
                setEditedRol(null);
                setSelectedUserId(null);

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
    const maskEmail = (email) => {
        if (email) {
            const middleIndex = Math.floor(email.length / 2);
            const maskedEmail = email.substring(0, middleIndex - 6) + '*******' + email.substring(middleIndex + 1);
            return maskedEmail;
        }
        return '';
    };
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
        XLSX.writeFile(wb, 'usuarios.xlsx');
    };
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de usuarios', 14, 10);

        const data = prductos.map((item) => [item._id, item.name, item.mail, item.is_admin]);

        doc.autoTable({
            head: [['Id', 'Nombre', 'Email', 'Admin']],
            body: data,
        });

        doc.save('usuarios.pdf');
    };
    return (
        <div className='dashboardGrid'>
            <NavbarDashboard />

            <section className='sectionDashboard'>
                <div className='title_Dash'>
                    <FontAwesomeIcon icon={faShoppingCart} className='iconDashTitle' />
                    <h2 >Compras {prductos?.length}</h2>
                </div>

                {showSpiral &&
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='descripcion'>Id</th>
                                    <th className='descripcion'>Nombre</th>
                                    <th className='descripcion'>Email</th>
                                    <th className='descripcion'>rol</th>
                                    <th className='descripcion'>Imagen</th>
                                    <th className='descripcion'>Acciones</th>
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
                                </tr>
                                <tr>
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
                                </tr>
                                <tr>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                {!showSpiral && (
                    <div>
                        <div className='deflex'>
                            <Anchor to={``} id='crear'>Agregar</Anchor>
                            <div className='deFlexExport'>
                                <button className="excel-button">
                                    <FontAwesomeIcon icon={faFileExcel} />
                                </button>

                                <button className="pdf-button">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                </button>
                            </div>
                            <input
                                className='filterText'
                                type="text"
                                placeholder="Buscar por nombre"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="table-container">
                            {filteredUsuarios.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>N° Transcaccion</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Imagen</th>
                                            <th>Producto</th>
                                            <th>Categoria</th>
                                            <th>Imagen</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsuarios.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item?._id}</td>
                                                <td>{item?.idTransaccion}</td>
                                                <td>{item?.user_id?.name}</td>
                                                <td>{maskEmail(item.user_id?.mail)}</td>
                                                <td><img src={item?.user_id?.photo} alt="" /></td>
                                                <td>{item?.products[0]?.title}</td>
                                                <td>  {item?.products[0]?.categoria}</td>
                                                <td><img src={item?.products[0]?.cover_photo} alt="" /></td>
                                                <td>
                                                    <span
                                                        className="material-icons"
                                                        style={{ cursor: "pointer", color: "red" }}

                                                    >
                                                        delete
                                                    </span>
                                                    <span
                                                        className="material-icons"
                                                        style={{ cursor: "pointer", color: "#0074E4", marginLeft: "10px" }}

                                                    >
                                                        edit
                                                    </span>
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                    {selectedUserId !== null && editedRol !== null && (
                                        <div className='modal-edit'>
                                            <div className='submodal-edit'>
                                                <select
                                                    value={editedRol}
                                                    onChange={(e) => setEditedRol(e.target.value)}
                                                >
                                                    <option value="true">Admin</option>
                                                    <option value="false">Usuario</option>
                                                </select>
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
                                            <th className='descripcion'>Nombre</th>
                                            <th className='descripcion'>Email</th>
                                            <th className='descripcion'>Rol</th>
                                            <th className='descripcion'>Imagen</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="noResult" colSpan="5">No hay resultados</td>
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
