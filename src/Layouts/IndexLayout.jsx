import React from 'react'
import Header from '../Pages/Header/Header'

import Footer from '../Components/Footer/Footer'
import Hero from '../Components/Hero/Hero'
import Develloper from '../Components/Developer/Developer'
import Ofertas from '../Components/Ofertas/Ofertas'
import NavbarMobile from '../Components/NavbarMobile/NavbarMobile'
export default function IndexLayout() {
    return (
        <div >
            <Header />
            <Hero />

            <Ofertas />
            <Footer />
            <Develloper />
            <NavbarMobile />

        </div>
    )
}
