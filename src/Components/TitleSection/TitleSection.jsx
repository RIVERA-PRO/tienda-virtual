import React from 'react'
import './TitleSection.css'
import { Link as Anchor } from "react-router-dom";
export default function TitleSection({ section, link }) {
    return (
        <div className='titleSection'>

            <h3> {section}</h3>
            <Anchor to={`/${link}`}>
                Ver más
            </Anchor>
        </div>
    )
}
