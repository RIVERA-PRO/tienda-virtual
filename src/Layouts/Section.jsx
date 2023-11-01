import React from 'react'
import Header from '../Pages/Header/Header'
import { Outlet } from "react-router-dom";


import NavbarMobile from '../Components/NavbarMobile/NavbarMobile'
export default function Section() {
    return (
        <div>
            <Header />
            <Outlet />



            <NavbarMobile />
        </div>
    )
}
