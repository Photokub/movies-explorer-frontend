import React from "react";
import './WelcomeScreen.css'
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import Form from "../Form/Form";
import RegisterForm from "../RegisterForm/RegisterForm";

export default function WelcomeScreen({title, subtitle, sublink}) {
    return (
        <div className='welcome__warp'>
            <section className='welcome'>
                <img className='welcome__logo' src={logo} alt='логотип'/>
                <p className='welcome__title'>{title}</p>
                <RegisterForm/>
                <p className='welcome__subtitle'>{subtitle}<Link className='welcome__sublink' to='/signin'>{sublink}</Link></p>
            </section>
        </div>
    )
}