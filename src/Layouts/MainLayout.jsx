import React from 'react'
import Header from '../Pages/Header/Header'
import { Outlet } from "react-router-dom";

import Footer from '../Components/Footer/Footer'

import NavbarMobile from '../Components/NavbarMobile/NavbarMobile'
export default function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />

            <Footer />

            <NavbarMobile />
        </div>
    )
}
