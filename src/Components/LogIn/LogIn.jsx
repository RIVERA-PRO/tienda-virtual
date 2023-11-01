import React from 'react';
import './LogIn.css';
import Swal from 'sweetalert2'
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';


export default function SignIn() {
  const [reload, setReload] = useState(false); // Estado para actualizar el componente

  const dataForm = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let formInputs = [];

    Object.values(dataForm.current.elements).forEach((e) => {
      if (e.nodeName === 'INPUT' && e.name) {
        formInputs.push(e);
      }
    });
    formInputs.pop();
    let data = {
      [formInputs[0].name]: formInputs[0].value,
      [formInputs[1].name]: formInputs[1].value,
    };
    console.log(data);

    let url = 'http://localhost:8080/users/signin';
    try {
      let res = await axios.post(url, data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: res.data.user.name,
          mail: res.data.user.mail,
          photo: res.data.user.photo,
          user_id: res.data.user._id,
          profile: res.data.user.profile,
          banner: res.data.user.banner
        })
      );
      setReload(true); // Actualizar el estado para recargar el componente
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sesion iniciada',
        showConfirmButton: false,
        timer: 1500
      })
      dataForm.current.reset();
      setInterval(() => window.location.href = '/')
    } catch (error) {
      console.error(error);
      let errorMessage = '';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
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
      <form action='' className='form-register' onSubmit={handleSubmit} ref={dataForm}>
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

