import React from 'react';
import { useNavigate } from "react-router-dom";
import './PageNotFound.css'

export default function PageNotFound(){

    const navigate = useNavigate();

    return(
        <section className='page-not-found'>
            <p className='page-not-found__title'>404</p>
            <p className='page-not-found__subtitle'>Страница не найдена</p>
            <button className="page-not-found__button" onClick={() => navigate(-1)}>Назад</button>
        </section>
    )
}