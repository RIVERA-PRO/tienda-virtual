import React from 'react'
import Header from '../Pages/Header/Header'

import Footer from '../Components/Footer/Footer'
import Hero from '../Components/Hero/Hero'
import Develloper from '../Components/Developer/Developer'
import Ofertas from '../Components/Ofertas/Ofertas'
import NavbarMobile from '../Components/NavbarMobile/NavbarMobile'
import ProductosHome from '../Components/ProductosHome/ProductosHome'
import Banner from '../Components/Banner/Banner'
import Categorias from '../Components/Categorias/Categorias'
import TitleSection from '../Components/TitleSection/TitleSection'
export default function IndexLayout() {
    return (
        <div >
            <Header />
            <Hero />
            <Categorias />
            <Ofertas />
            <TitleSection section="Productos" link="productos" />
            <ProductosHome />
            <Banner />
            <Footer />
            <Develloper />
            <NavbarMobile />

        </div>
    )
}
