import React from 'react'
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard'
import UsersCantidad from '../UsersCantidad/UsersCantidad'
import ProdcutosCantidad from '../ProductosCantidad/ProductosCantidad'
import ComprasCantidad from '../ComprasCantidad/ComprasCantidad'
import UserDashboardMain from '../UserDashboardMain/UserDashboardMain'
import ProductsDashboardMain from '../ProductsDashboardMain/ProductsDashboardMain'
import './MainDashboard.css'
export default function MainDashboard() {
    return (
        <div className='dashboardGridMain'>
            <NavbarDashboard />
            <section className='sectionDashboardMain'>
                <div>
                    <div className='cantidades'>
                        <UsersCantidad />
                        <ProdcutosCantidad />
                        <ComprasCantidad />


                    </div>
                    <ProductsDashboardMain />
                </div>
                <UserDashboardMain />

            </section>





        </div>
    )
}
