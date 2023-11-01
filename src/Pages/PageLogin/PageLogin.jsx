import React, { useState } from 'react';
import Login from '../../Components/LogIn/LogIn';
import Register from '../../Components/Register/Register';
import './PageLogin.css'
import imagen from '../../images/home.png'
export default function PageLogin() {
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className='PageLogin'>
            {showLogin ? (
                <div>
                    <div className='img-form'>
                        <div>
                            <img src={imagen} alt="" className='fondo' />
                        </div>
                        <Login />
                    </div>
                    <p className='sinCuenta'>¿No tienes cuenta? <button onClick={toggleForm}>Registrarse</button></p>
                </div>
            ) : (
                <div>
                    <div className='img-form'>
                        <div>
                            <img src={imagen} alt="" className='fondo' />
                        </div>
                        <Register />
                    </div>
                    <p className='sinCuenta'>¿Ya tienes una cuenta? <button onClick={toggleForm}>Iniciar sesión</button></p>
                </div>
            )}
        </div>
    );
}
