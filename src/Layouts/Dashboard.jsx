import React from 'react'
import './Dashboard.css'
import { Outlet } from "react-router-dom";
import NavbarDashboard from '../Components/NavbarDashboard/NavbarDashboard'
import MainDshboard from '../Components/MainDashboard/MainDashboard'
export default function Dashboard() {
    return (
        <div >
            <Outlet />
        </div>
    )
}
