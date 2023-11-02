import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'
import 'react-responsive-modal/styles.css'; // Importa los estilos de react-responsive-modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import LoadingDetail from "../LoadingDetail/LoadingDetail";

import { Link as Anchor } from "react-router-dom";
export default function Detail() {
    const { id } = useParams(); // Obtener el user_id de los parámetros de la URL
    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };

                const response = await fetch(`https://tiendavirtual-qleq.onrender.com/publicacion/${id}`, headers);
                if (response.ok) {
                    const data = await response.json();
                    setProducto(data.publicacion);
                    setLoading(false);
                    console.log(data.publicacion);
                } else {
                    console.error('Error al obtener los datos de la publicación:', response.status);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al obtener los datos de la publicación:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="detail-contain">
            {loading ? (
                <LoadingDetail />
            ) : producto ? (

                <div className="detail">
                    <div className="deColum">
                        <div className="imgPrincipalDetail">
                            <img src={producto.cover_photo} alt="" />
                        </div>
                        <div className="imgDetail">
                            <img src={producto?.cover_photo2} alt="" />
                            <img src={producto?.cover_photo3} alt="" />
                            <img src={producto?.cover_photo4} alt="" />
                        </div>
                    </div>
                    <div className="deColum">
                        <h1>{producto.title}</h1>
                        <h2>$ {producto.price}</h2>
                        <p>{producto.description}</p>

                        <Anchor to={`/${producto.categoria}`}>
                            {producto.categoria}
                        </Anchor>
                    </div>

                    <div className="btns_final">

                        <button className="agregar">
                            Agregar al carrrito
                        </button>
                        <button className="comprar">
                            Comprar
                        </button>

                    </div>
                </div>
            ) : (
                <p>No se encontró la publicación.</p>
            )}
        </div>
    );
}
