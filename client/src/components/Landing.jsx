import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import style from '../css/Landing.module.css'
import css from '../css/Button.module.css'
import pos from '../css/Positions.module.css'
import pokeWall from '../assets/pokeWall.jpg'
import Intro from '../assets/intro2.mp3'

export default function LandingPage() {
    let audio = new Audio(Intro)
    // audio.play()


    return (
        <>
            <h1 className={style.h1}>Pokemon App</h1>
            <Link to='/home'>
                <button
                    className={css.button + ' ' + pos.d}
                >Start</button>
            </Link>
            {/* <img src={pokeWall} alt="Loading.." /> */}
        </>
    )
}