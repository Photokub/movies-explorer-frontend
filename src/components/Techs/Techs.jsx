import React from "react";
import './Techs.css'

export default function Techs() {
    return (
        <section className='techs main__section'>
            <h2 className='techs__title main__title'>Технологии</h2>
            <h4 className='techs__subtitle main__subhead'>7 технологий</h4>
            <p className='techs__text main__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className='techs__container'>
                <p className='techs__skill-text'>HTML</p>
                <p className='techs__skill-text'>CSS</p>
                <p className='techs__skill-text'>JS</p>
                <p className='techs__skill-text'>React</p>
                <p className='techs__skill-text'>Git</p>
                <p className='techs__skill-text'>Express.js</p>
                <p className='techs__skill-text'>mongoDB</p>
            </div>
        </section>
    )
}