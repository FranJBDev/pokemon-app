import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions';
import loading from '../assets/cargando.gif'
import style from '../css/Detail.module.css'

export default function Detail(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const P = useSelector(state => state.detail) // P = current pokemon

    return (
        <div>{
            P.length && P[0].id == props.match.params.id ? <div >
                <Link to='/home'><button >Back</button></Link>
                <h1>{P[0].id} - {P[0].name.charAt(0).toUpperCase() + P[0].name.slice(1)}</h1>

                <div>
                    <img src={P[0].img2} alt='Not Found' />
                    <div>
                        <h1>Types</h1>
                        <span >{P[0].types ? P[0].types.map(el => { return (el + ', ') }
                        ) : <span>Types not found</span>
                        }</span>

                    </div>
                </div>

                {!P[0].createdInDb ?
                    <div>
                        <h1>Abilities</h1>
                        <div>
                            <span> {P[0].abilities.length ? P[0].abilities.map(el => {
                                return (
                                    <span key={el}>{el + ', '}</span>
                                )
                            }) :
                                <span>This pokemon has no abilities</span>
                            }</span>
                            <div>

                            </div>
                            <div>
                                <h1>Moves</h1>
                                <span> {P[0].moves.length ? P[0].moves.map(el => {
                                    return (
                                        <span key={el}> {el + ', '}</span>
                                    )
                                }) :
                                    <span>This pokemon has no moves</span>
                                }</span>

                            </div>
                        </div>
                    </div>
                    :
                    <div>This pokemon has no Data</div>
                }

                <div><h1>Stats</h1>
                    <div><span>Base Experience: {P[0].base_experience}</span></div>
                    <div><span>Order: {P[0].order}</span></div>
                    <div><span>Hp: {P[0].hp}</span></div>
                    <div>
                        <span> Attack: {P[0].attack}</span>
                    </div>
                    <div>
                        <div>
                            <span>Defense: {P[0].defense}</span>
                        </div>

                    </div>
                    <div>
                        <span>Speed: {P[0].speed}</span>
                    </div>
                    <div>
                        <span>Weight: {P[0].weight / 10}kg</span>

                    </div>
                    <div>
                        <span>Height: {P[0].height / 10}m</span>
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