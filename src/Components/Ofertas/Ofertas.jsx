import React from 'react'
import zapatillas from '../../images/zapatillas.png'
import zapatillaa from '../../images/zapatillaa.png'
import pantalones from '../../images/pantalones.png'
import remeras from '../../images/remeras.png'
import './Ofertas.css'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
export default function Ofertas() {
    return (
        <div className='ofertas'>

            <div className='imgOfertas'>
                <Anchor to={`/products`} >

                    <img src={pantalones} alt="" />
                </Anchor>
                <Anchor to={`/products`} >

                    <img src={remeras} alt="" />
                </Anchor>
                <Anchor to={`/products`} >

                    <img src={zapatillaa} alt="" />
                </Anchor>
            </div>


        </div>
    )
}
