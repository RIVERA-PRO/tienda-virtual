import React from 'react'
import './Register.css'
import { useRef, useEffect } from "react";
import axios from 'axios'










export default function Register() {



  return (
    <div className='form-register-contain'>
      <form action="" className='form-register' >
        <h4>Registrarse</h4>
        <label htmlFor="">Nombre</label>
        <input type="text" placeholder=' Nombre' name='name' id='name' />
        <label htmlFor="">Email</label>
        <input type="email" placeholder='Email' name='mail' id='mail' />
        <label htmlFor="">Foto</label>
        <input type="text" placeholder='Foto url' name='photo' id='photo' />
        <label htmlFor="">Contraseña</label>
        <input type="password" placeholder='Contraseña' name='password' id='password' />
        <div className='enviar'>
          <input type='submit'></input>
        </div>
        <button
          className="google"
        >

          Registrar con google

        </button>

      </form>
    </div>
  )
}
