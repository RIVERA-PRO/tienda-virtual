import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'
import { Link as Anchor } from 'react-router-dom';
import 'react-responsive-modal/styles.css'; // Importa los estilos de react-responsive-modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faMapMarker } from '@fortawesome/free-solid-svg-icons';


export default function Detail() {




    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);





    return (
        <div className="detail-contain">

        </div>
    );
}
