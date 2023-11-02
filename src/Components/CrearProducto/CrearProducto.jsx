import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CrearProducto.css';
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
export default function CrearProducto() {
    const [reloadCount, setReloadCount] = useState(0);
    let [editMode, setEditMode] = useState('info');

    const title = useRef();
    const price = useRef();
    const cover_photo = useRef();
    const categoria = useRef();
    const description = useRef();
    const cover_photo2 = useRef();
    const cover_photo3 = useRef();
    const cover_photo4 = useRef();
    let [modal, setModal] = useState(false);
    const [reload, setReload] = useState(false); // Nuevo estado para controlar la recarga
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user?.user_id;
    let nameUser = user?.name
    let mail = user?.mail
    let photo = user?.photo

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            "title": title.current.value,
            "description": description.current.value,
            "cover_photo": cover_photo.current.value,
            "cover_photo2": cover_photo2.current.value,
            "cover_photo3": cover_photo3.current.value,
            "cover_photo4": cover_photo4.current.value,
            "price": price.current.value,
            "categoria": categoria.current.value,
            "name": nameUser,
            "photo": photo,
            "mail": mail,
            "user_id": userId,
        };
        console.log(data);
        let url = 'https://tiendavirtual-qleq.onrender.com/publicacion';
        let token = localStorage.getItem('token');
        let headers = { 'Authorization': `Bearer ${token}` };
        try {
            await axios.post(url, data, { headers: headers });

            setModal(!modal);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto creado',
                showConfirmButton: false,
                timer: 1500
            })
            setInterval(() => window.location.href = '/productos')

            setReloadCount((prevCount) => prevCount + 1); // Incrementar el contador de recargas

        } catch (err) {
            console.log(err);
            setModal(!modal);

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err,
                showConfirmButton: false,
                timer: 1500
            })

        }
    }





    return (
        <div className='dashboardGrid'>
            <NavbarDashboard />

            <section className='sectionDashboard'>
                <form onSubmit={handleSubmit} className='formProductosContain' >
                    <div className='formProductos'>

                        <div className='inputs'>
                            <label>Título</label>

                            <input type="text" placeholder='Título' required ref={title} />

                        </div>
                        <div className='inputs'>
                            <label>Precio</label>
                            <input type="number" placeholder='Precio' required ref={price} />
                        </div>
                        <div className='inputs'>
                            <label>Categoría</label>
                            <select required ref={categoria}>
                                <option value="Zapatilla">Zapatilla</option>
                                <option value="Pantalon">Pantalon</option>
                                <option value="Remera">Remera</option>

                            </select>
                        </div>
                        <div className='inputs'>
                            <label>Foto de portada</label>
                            <input type="text" placeholder='Foto Principal (link)' ref={cover_photo} />
                        </div>

                        <div className='inputs'>
                            <label>Foto adicional 2</label>
                            <input type="text" placeholder='Foto adicional 2 (link)' ref={cover_photo2} />
                        </div>
                        <div className='inputs'>
                            <label>Foto adicional 3</label>
                            <input type="text" placeholder='Foto adicional 3 (link)' ref={cover_photo3} />
                        </div>
                        <div className='inputs'>
                            <label>Foto adicional 4</label>
                            <input type="text" placeholder='Foto adicional 3 (link)' ref={cover_photo4} />
                        </div>

                        <div className='inputs'>
                            <label>Descripcion</label>
                            <textarea type="text" placeholder='Texto' required ref={description} />
                        </div>
                    </div>

                    <button id='crear'>

                        <FontAwesomeIcon icon={faPlus} />
                        Crear
                    </button>

                </form>
            </section>

        </div>
    );
}
