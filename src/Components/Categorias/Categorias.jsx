import React from 'react';
import './Categorias.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTshirt, faShoePrints } from '@fortawesome/free-solid-svg-icons';

export default function Categorias() {
    return (
        <div className='categoriasContain'>
            <div className='cardCategoria'>
                <FontAwesomeIcon icon={faShoppingCart} className='icon' />
                <div>
                    <h3>Pantalones</h3>
                    <p>Nuevos productos en marca</p>
                </div>
            </div>
            <div className='cardCategoria'>
                <FontAwesomeIcon icon={faShoppingCart} className='icon' />
                <div>
                    <h3>Remeras</h3>
                    <p>Nuevos productos en marca</p>
                </div>
            </div>
            <div className='cardCategoria'>
                <FontAwesomeIcon icon={faShoppingCart} className='icon' />
                <div>
                    <h3>Zapatillas</h3>
                    <p>Nuevos productos en marca</p>
                </div>
            </div>
        </div>
    );
}
