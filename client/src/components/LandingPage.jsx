import React, { useEffect } from 'react';
import { getPokemons, getTypes } from '../redux/actions'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
// import style from '../css/LandingPage.module.css';
import pokeWall from '../assets/pokeWall.jpg'

export default function LandingPage() {

    var audio = document.createElement("audio");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    }, [dispatch])

    return (
        <div>
            <div style={{ display: 'flex', flexFlow: 'column' }}>
                <img src='images/logo.png' alt="Pokemon" width='400px' />
                <Link to='/home'>
                    <button >Home</button>
                </Link>
            </div>
            <img src={pokeWall} alt="Loading.." width='80%' />
        </div>
    )
}