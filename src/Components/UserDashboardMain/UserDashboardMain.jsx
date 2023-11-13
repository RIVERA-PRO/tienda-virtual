import React, { useState, useEffect } from 'react';
import './UserDashboardMain.css';
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';

export default function UserDashboardMain() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {

        fetch('https://tiendavirtual-qleq.onrender.com/users')
            .then(response => response.json())
            .then(data => {

                setUsers(data?.users.reverse());

                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
                setLoading(false);

            });

    };


    const maskEmail = (email) => {
        if (email) {
            const middleIndex = Math.floor(email.length / 2);
            const maskedEmail = email.substring(0, middleIndex - 6) + '*******' + email.substring(middleIndex + 1);
            return maskedEmail;
        }
        return '';
    };


    return (
        <div >





            {loading ? (
                <div className='UserDashboardMain'>


                    <div className='cardsMainDashborad'>
                        <div className='cardsMainDashboradText'>
                            <span className='spanImgloading'>

                            </span>

                            <span className='spanItextloading'>

                            </span>


                        </div>

                    </div>
                    <div className='cardsMainDashborad'>
                        <div className='cardsMainDashboradText'>
                            <span className='spanImgloading'>

                            </span>

                            <span className='spanItextloading'>

                            </span>


                        </div>

                    </div>
                    <div className='cardsMainDashborad'>
                        <div className='cardsMainDashboradText'>
                            <span className='spanImgloading'>

                            </span>

                            <span className='spanItextloading'>

                            </span>


                        </div>

                    </div>
                    <div className='cardsMainDashborad'>
                        <div className='cardsMainDashboradText'>
                            <span className='spanImgloading'>

                            </span>

                            <span className='spanItextloading'>

                            </span>


                        </div>

                    </div>
                    <div className='cardsMainDashborad'>
                        <div className='cardsMainDashboradText'>
                            <span className='spanImgloading'>

                            </span>

                            <span className='spanItextloading'>

                            </span>


                        </div>

                    </div>

                </div>

            ) : (
                <div className='UserDashboardMain'>
                    <h3 className='title_dashboard'>Ultimos Registros</h3>


                    {
                        users.slice(0, 5).map((item) => (
                            <div className='cardsMainDashborad'>
                                <div className='cardsMainDashboradText'>
                                    <img src={item.photo} alt="" />
                                    <div>
                                        <h4>{item.name}</h4>
                                        <h5>{maskEmail(item.mail)}</h5>
                                    </div>
                                </div>
                                <p style={{ color: item?.is_admin ? 'green' : 'red' }}>
                                    {item?.is_admin ? 'admin' : 'usuario'}
                                </p>
                            </div>
                        ))
                    }


                </div>



            )}


        </div>
    );
}
