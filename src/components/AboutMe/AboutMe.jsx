import React from "react";
import photo from '../../images/255x307.png'
import './AboutMe.css'

export default function AboutMe() {
    return (
        <section className='about-me main__section' id='about-me'>
            <h2 className='about-me__title main__title'>Студент</h2>
            <div className='about-me__container'>
                <h4 className='about-me__subtitle main__subhead'>Александр</h4>
                <h5 className='about-me__caption'>Фронтенд-разработчик, 36 лет</h5>
                <p className='about-me__text main__text'>Родился и живу в Москве, где и учился в колледже на факультете
                    «ЭВМ, комплексы и сети», а затем получил образование в институте и аспирантуре на факультете
                    дизайна. Работаю дизайнером на протяжении 11 лет, 6 из которых занимаюсь веб-дизайном. На курсах
                    веб-разработки прочакачал свои скилы и теперь выполняю заказы «под ключ» – от макета до разработки.
                    Увлекаюсь рыбалкой, горными лыжами, резьбой по дереву. Женат на красивой жене.</p>
                <img className='about-me__photo' src={photo} alt='фото Александра'/>
                <a className='about-me__github-link' target="_blank" href='https://github.com/Photokub'>Github</a>
            </div>
        </section>
    )
}