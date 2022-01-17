import React from 'react';
import style from '../css/Card.module.css';

export default function Card({ props }) {
    let { name, types, img, id } = props
    return (
        <div className={style.container}>
            <div className={style.card + ' ' + style.bounce}>
                <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2> {
                /* '~\b([a-z])~'
  */}
                <img className={style.img} src={img} width='200px' alt="Img not found" height="190px" />

                <div  > {/*Types*/}
                    {
                        types ? types.map((el, i) => {
                            return (
                                <span>{el + (i !== types.length - 1 ? ' - ' : '')}</span>
                            )
                        }
                        ) :
                            <span>Types not found</span>
                    }
                </div>
            </div>
        </div>
    )
}