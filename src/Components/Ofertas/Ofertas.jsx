import React from 'react'
import zapatillas from '../../images/zapatillas.png'
import pantalones from '../../images/pantalones.png'
import remeras from '../../images/remeras.png'
import './Ofertas.css'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
export default function Ofertas() {
    return (
        <div className='ofertas'>

            <div className='imgOfertas'>
                <Anchor to={`/pantalones`} >

                    <img src={pantalones} alt="" />
                </Anchor>
                <Anchor to={`/remeras`} >

                    <img src={remeras} alt="" />
                </Anchor>

            </div>
            <Anchor to={`/zapatillas`} className='bannerImg' >

                <img src={zapatillas} alt="" />
            </Anchor>

        </div>
    )
}
