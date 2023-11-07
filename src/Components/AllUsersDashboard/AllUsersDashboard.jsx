import React, { useState, useEffect } from 'react';
import './AllUsersDashboard.css';
import { Link as Anchor } from "react-router-dom";
import axios from 'axios';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDelete } from '@fortawesome/free-solid-svg-icons';

export default function AllUsersDashboard() {
    const [usuarios, setUsuarios] = useState([]);
    const [showSpiral, setShowSpiral] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedRol, setEditedRol] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    useEffect(() => {
        axios
            .get('https://tiendavirtual-qleq.onrender.com/users')
            .then((response) => {
                setTimeout(() => {
                    setUsuarios(response.data.users);
                    setShowSpiral(false);
                    console.log(response.data.users);
                }, 2000);
            })
            .catch((error) => {
                console.error('Error al obtener los usuarios:', error);
            });
    }, []);

    const filteredUsuarios = usuarios.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
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


                setUsuarios(response.data.users);

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

                const updatedUsuarios = usuarios.map((usuario) => {
                    if (usuario._id === selectedUserId) {
                        return { ...usuario, is_admin: editedRol };
                    }
                    return usuario;
                });

                setUsuarios(updatedUsuarios);
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
    return (
        <div className='dashboardGrid'>
            <NavbarDashboard />
            <section className='sectionDashboard'>
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
                                    <td className="noResult" colSpan="9">Cargando</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                {!showSpiral && (
                    <div>
                        <div className='deflex'>
                            <Anchor to={`/usuarios/crear`} id='crear'>Agregar</Anchor>
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
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>rol</th>
                                            <th>Imagen</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsuarios.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item?._id}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.mail}</td>
                                                <td>{item?.is_admin ? 'admin' : 'usuario'}</td>
                                                <td><img src={item?.photo} alt="" /></td>
                                                <td>
                                                    <span
                                                        className="material-icons"
                                                        style={{ cursor: "pointer", color: "red" }}
                                                        onClick={() => handleDeleteUsuario(item._id)}
                                                    >
                                                        delete
                                                    </span>
                                                    <span
                                                        className="material-icons"
                                                        style={{ cursor: "pointer", color: "#0074E4", marginLeft: "10px" }}
                                                        onClick={() => handleEditUsuario(item._id, item.is_admin)}
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
