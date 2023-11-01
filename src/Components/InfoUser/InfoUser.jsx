import React, { useState, useEffect } from 'react'
import './infoUser.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link as Anchor } from "react-router-dom";
function ProfilePage({ handleLogout }) {

  const [userData, setUserData] = useState(null);

  const updateUserData = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  };

  // Llamar a la función updateUserData cuando el componente se monte
  useEffect(() => {
    updateUserData();
  }, []);




  return (
    <div className='userInfoContainer'>
      {userData ? (
        <div>
          <Anchor to={`/usuario/${userData.user_id}`} >
            <img src={userData.photo} alt="" />
          </Anchor>

        </div>
      ) : (
        <Anchor to={`/login`} >
          <FontAwesomeIcon icon={faUser} />
        </Anchor>

      )}
    </div>
  );

}

export default ProfilePage;