import IndexLayout from "../Layouts/IndexLayout";
import MainLayout from "../Layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import PageDetail from '../Pages/PageDetail/PageDetail'
import Carrito from "../Components/Carrito/Carrito";
import PageLogin from "./PageLogin/PageLogin";
import PerfilUser from "../Components/PerfilUser/PerfilUser";
import Section from '../Layouts/Section'
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
                path: "/inmobiliario/:id/:inmobiliario",
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
                path: "/usuario/:id",
                element: <PerfilUser />,
            },
        ],
    },
]);
