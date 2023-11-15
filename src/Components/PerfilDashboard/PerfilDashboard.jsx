import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser, faExpand } from '@fortawesome/free-solid-svg-icons';

import './PerfilDashboard.css';
import { Link as Anchor, useLocation } from 'react-router-dom';
import Logout from '../LogoutDashboard/LogoutDashboard';
import InputSearchDashboard from '../InputSearchDashboard/InputSearchDashboard';

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

    const toggleFullscreen = () => {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        updateUserData();
    }, []);

    return (
        <div className='PerfilDashboardContain'>
            <InputSearchDashboard />

            {userData ? (
                <div className='PerfilDashboardText'>
                    <FontAwesomeIcon icon={faExpand} onClick={toggleFullscreen} className='iconFull' />
                    <img src={userData.photo} alt="" />
                    <div>
                        <p>{userData.name}</p>
                        <h5>{userData.mail}</h5>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} onClick={openModal} />

                </div>
            ) : (
                <Anchor to={`/login`}>
                    <FontAwesomeIcon icon={faUser} />
                </Anchor>
            )}
            {modalOpen && (
                <div className='modalLogout'>
                    <Logout />
                </div>
            )}
        </div>
    );
}
