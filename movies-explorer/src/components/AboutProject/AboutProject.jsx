import React from "react";

export default function AboutProject() {
    return (
        <section className='about-project'>
            <h2 className='about-project__title main__title'>О проекте</h2>
            <h3 className='about-project__subtitle main__subtitle'>Дипломный проект включал 5 этапов</h3>
            <h3 className='about-project__subtitle main__subtitle'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__text main__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p className='about-project__text main__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            <p className='about-project__text main__text'>1 неделя</p>
            <p className='about-project__text main__text'>4 недели</p>
            <p className='about-project__caption main__caption'>Back-end</p>
            <p className='about-project__caption main__caption'>Front-end</p>
        </section>
    )
}