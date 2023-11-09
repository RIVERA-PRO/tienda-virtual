import React from 'react'
import zapatillas from '../../images/zapatillas.png'

import './Banner.css'
import { Link as Anchor, } from "react-router-dom";
export default function Banner() {
    return (
        <div className='bannerConatin'>


            <Anchor to={`/products`}  >

                <img src={zapatillas} alt="" className='bannerImg' />
            </Anchor>

        </div>
    )
}
