import React from 'react'
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard'
import UsersCantidad from '../UsersCantidad/UsersCantidad'
export default function MainDashboard() {
    return (
        <div className='dashboardGrid'>
            <NavbarDashboard />


            <section className='sectionDashboard'>
                <UsersCantidad />

            </section>





        </div>
    )
}
