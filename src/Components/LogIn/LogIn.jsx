import React from 'react';
import './LogIn.css';




export default function SignIn() {


  return (
    <div className='form-register-contain'>
      <form action='' className='form-register'>
        <h4>Ingresar</h4>
        <label htmlFor=''>Email</label>
        <input type='email' placeholder='Email' name='mail' id='mail' />
        <label htmlFor=''>Contraseña</label>
        <input type='password' placeholder='Contraseña' name='password' id='password' />
        <div className='enviar'>
          <input type='submit'></input>
        </div>
        <button
          className="google"
        >

          Iniciar sesion con google
        </button>
      </form>
    </div>
  );
}

