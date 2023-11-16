import React from 'react'
import './Footer.css'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import logo from '../../images/logo.png'
export default function Footer() {

    return (
        <div className='foter'>




            <div className='footerGrid'>
                <div className='contact-footer'>
                    <img src={logo} alt="" />
                    <Anchor>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Anchor>

                </div>
                <div className='contact-footer'>

                    <Anchor>3875683101 </Anchor>
                    <Anchor>Salta, Argentina</Anchor>
                    <Anchor>modadeportiva@gmail.com</Anchor>
                </div>
                <div className='contact-footer'>

                    <Anchor to={`/`} >Remeras </Anchor>
                    <Anchor to={`/`}>Zapatillas </Anchor>
                    <Anchor to={`/`}>Pantalones </Anchor>
                </div>

                <div className='contact-footer'>
                    <input type="text" placeholder='Correo electronico' />
                    <button type="button">Enviar</button>
                </div>
            </div>
            <div className='Copyright'>
                <p>Copyright © 2023 Todos los derechos reservados</p>

            </div>



        </div>
    )
}
