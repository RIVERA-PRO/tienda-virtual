import React from 'react'
import './Register.css'
import { useRef, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'








export default function Register() {
  const navigate = useNavigate();


  let dataForm = useRef()


  async function handleSubmit(e) {
    e.preventDefault()

    let formInputs = []

    Object.values(dataForm.current.elements).forEach(e => {
      if (e.nodeName === 'INPUT' && e.name) {
        formInputs.push(e)
      }
    })
    formInputs.pop()
    let data = {
      [formInputs[0].name]: formInputs[0].value,
      [formInputs[1].name]: formInputs[1].value,
      [formInputs[2].name]: formInputs[2].value || 'https://i.postimg.cc/VNyHKfFn/gratis-png-perfil-de-usuario-iconos-de-la-computadora-interfaz-de-usuario-mistica.png',
      [formInputs[3].name]: formInputs[3].value,
    }

    let url = 'https://tiendavirtual-qleq.onrender.com/users/signup'
    try {
      await axios.post(url, data)

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro Exitoso',
        showConfirmButton: false,
        timer: 1500
      })
      dataForm.current.reset()
    } catch (error) {
      console.error(error);
      let errorMessage = '';
      if (error.response && error.response.data && error.response.data.message) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.response.data.message.join(' ');
        }
      } else {
        errorMessage = 'Se produjo un error al procesar la solicitud.';
      }
      console.log(errorMessage);

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  return (
    <div className='form-register-contain'>
      <form action="" className='form-register' onSubmit={handleSubmit} ref={dataForm}>
        <h4>Registrarse</h4>
        <label htmlFor="">Nombre</label>
        <input type="text" placeholder=' Nombre' name='name' id='name' required />
        <label htmlFor="">Email</label>
        <input type="email" placeholder='Email' name='mail' id='mail' required />
        <label htmlFor="">Foto</label>
        <input type="text" placeholder='Foto url (opcional)' name='photo' id='photo' />
        <label htmlFor="">Contraseña</label>
        <input type="password" placeholder='Contraseña' name='password' id='password' required />
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
