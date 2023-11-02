import IndexLayout from "../Layouts/IndexLayout";
import MainLayout from "../Layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import PageDetail from '../Pages/PageDetail/PageDetail'
import Carrito from "../Components/Carrito/Carrito";
import PageLogin from "./PageLogin/PageLogin";
import PerfilUser from "../Components/PerfilUser/PerfilUser";
import Section from '../Layouts/Section'
import Dashboard from '../Layouts/Dashboard'
import MainDashboard from "../Components/MainDashboard/MainDashboard";
import CrearProducto from "../Components/CrearProducto/CrearProducto";
import ProductosDashboard from "../Components/ProductosDashboard/ProductosDashboard";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexLayout />,

    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/producto/:id",
                element: <PageDetail />,
            },



        ],
    },
    {
        path: "/",
        element: <Section />,
        children: [
            {
                path: "/login",
                element: <PageLogin />,
            },
            {
                path: "/carrito",
                element: <Carrito />,
            },
            {
                path: "/perfil/:id",
                element: <PerfilUser />,
            },
        ],
    },
    {
        path: "/",
        element: <Dashboard />,
        children: [


            {
                path: "/dashboard",
                element: <MainDashboard />,
            },
            {
                path: "/productos/crear",
                element: <CrearProducto />,
            },
            {
                path: "/productos",
                element: <ProductosDashboard />,
            },

        ],
    },
]);
