import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions';
import loading from '../assets/cargando.gif'
import css from '../css/Button.module.css'
import pos from '../css/Positions.module.css'
import style from '../css/Detail.module.css'

export default function Detail(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const P = useSelector(state => state.detail) // P = current pokemon

    return (
        <div className={style.frame}>{P.length && P[0].id == props.match.params.id ? <div >
            <Link to='/home'><button className={css.button + ' ' + pos.a}>Back</button></Link>


            <div className={style.row}>
                <div>
                    <h1>{P[0].id} - {P[0].name.charAt(0).toUpperCase() + P[0].name.slice(1)}</h1>
                    <img src={P[0].img2} alt='Not Found' />
                </div>
                <div>
                    <h1>Types</h1>
                    <p>{P[0].types ? P[0].types.map(el => {
                        return (
                            <p key={el}>{el}</p>
                        )
                    }
                    ) : <p>Types not found</p>
                    }</p>
                </div>
                {!P[0].createdInDb ?
                    <div>
                        <h1>Abilities</h1>
                        {P[0].abilities.length ? P[0].abilities.map((el) => {

                            return (
                                <p key={el}>{el}</p>
                            )
                        }) :
                            <p>This pokemon has no abilities</p>
                        }
                        {/* <div>
                                <h1>Moves</h1>
                                <p> {P[0].moves.length ? P[0].moves.map(el => {
                                    return (
                                        <p key={el}> {el + ', '}</p>
                                    )
                                }) :
                                    <p>This pokemon has no moves</p>
                                }</p>

                            </div> */}
                        {/* </div> */}
                    </div>
                    :
                    <p>This pokemon has no Data</p>
                }
                <div><h1>Stats</h1>
                    {/* <div><p>Base Experience: {P[0].base_experience}</p></div>
                    <div><p>Order: {P[0].order}</p></div> */}
                    <p>Hp: {P[0].hp}</p>
                    <p> Attack: {P[0].attack}</p>
                    <p>Defense: {P[0].defense}</p>
                    <p>Speed: {P[0].speed}</p>
                    <p>Weight: {P[0].weight / 10}kg</p>
                    <p>Height: {P[0].height / 10}m</p>
                </div>
            </div>

        </div> :
            <div>
                <img src={loading} alt="Loading.." width='250px' />
                <p>Loading...</p>
            </div>
        }
        </div>
    )
}