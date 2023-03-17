import React from "react";
import './AboutProject.css'

export default function AboutProject() {
    return (
        <section className='about-project main__section' id='about-project'>
            <h2 className='about-project__title main__title'>О проекте</h2>
            <div className='about-project__table-container'>
                <article className="about-project__cell">
                    <h3 className='about-project__subtitle main__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__text main__text'>Составление плана, работу над бэкендом, вёрстку,
                        добавление
                        функциональности и финальные доработки.</p>
                </article>
                <article className="about-project__cell">
                    <h3 className='about-project__subtitle main__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text main__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые
                        нужно
                        было соблюдать, чтобы успешно защититься.</p>
                </article>
            </div>
            <div className='about-project__graph'>
                <div className='about-project__text_graph-cell'>
                    <p className='about-project__text main__text about-project__text_graph'>1 неделя</p>
                </div>
                <div className='about-project__text_graph-cell'>
                    <p className='about-project__text main__text about-project__text_graph'>4 недели</p>
                </div>
                <p className='about-project__caption about-project__caption_graph main__caption'>Back-end</p>
                <p className='about-project__caption about-project__caption_graph main__caption'>Front-end</p>
            </div>
        </section>
    )
}