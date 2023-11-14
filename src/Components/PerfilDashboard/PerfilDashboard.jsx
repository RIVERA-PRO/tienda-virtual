
import { React, useState, useEffect } from 'react';
import './PerfilDashboard.css';
import { Link as Anchor, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faUser, faShoppingCart, faBox, faHome, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Logout from '../LogoutDashboard/LogoutDashboard'

export default function PerfilDashboard() {
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);

    const [userData, setUserData] = useState(null);

    const updateUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    };



    const openModal = () => {
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        updateUserData();
    }, []);
    return (
        <div className='PerfilDashboardContain'>
            <input type="text" />
            {userData ? (
                <div className='PerfilDashboardText'>
                    <img src={userData.photo} alt="" />
                    <div>
                        <p>{userData.name}</p>
                        <h5>{userData.mail}</h5>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} onClick={openModal} />
                </div>
            ) : (
                <Anchor to={`/login`} >
                    <FontAwesomeIcon icon={faUser} />
                </Anchor>

            )}
            {modalOpen &&
                <div className='modalLogout'>
                    <Logout />
                </div>
            }
        </div >
    )
}
