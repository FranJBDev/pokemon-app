import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import css from '../css/Button.module.css'
import pos from '../css/Positions.module.css'
import pokeWall from '../assets/pokeWall.jpg'
import Intro from '../assets/intro2.mp3'

export default function LandingPage() {
    let audio = new Audio(Intro)
    // audio.play()

    // var isPlaying = function (audio) {
    //     return audio
    //         && audio.currentTime > 0
    //         && !audio.paused
    //         && !audio.ended
    //         && audio.readyState > 2;
    // }

    // if (audio.currentTime = 0) audio.play()
    // console.log(audio)

    // function togglePause() {
    //     if (audio.paused && audio.currentTime > 0 && !audio.ended) {
    //         audio.play();
    //     } else {
    //         audio.pause();
    //     }
    // }

    return (
        <div>
            <div style={{ display: 'flex', flexFlow: 'column' }}>
                <h1>Pokemon App</h1>
                <Link to='/home'>
                    <button className={css.button + ' ' + pos.d}>Start</button>
                </Link>
            </div>
            <img src={pokeWall} alt="Loading.." width='80%' />
        </div>
    )
}