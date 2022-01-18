import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import position from '../css/Positions.module.css'
import css from '../css/Button.module.css'
import { reload } from '../redux/actions';
import Pages from './Pages';

export default function Navbar() {
    const allPokemons = useSelector(state => state.pokemons)
    const dispatch = useDispatch()
    const currentPage = useSelector(s => s.currentPage)
    const itemsPerPage = 12

    const handleClick = (e => {
        e.preventDefault();
        dispatch(reload());
    })

    return (
        <nav>
            <Link to='/'>
                <button className={css.button + ' ' + position.a} >Landing</button>
            </Link>
            <SearchBar />
            <Link to="/pokemons" ><button className={css.button + ' ' + position.b}>Create</button></Link>
            <button className={css.button + ' ' + position.c} onClick={e => { handleClick(e) }} >Reload</button>

            <Pages itemsPerPage={itemsPerPage}
                allPokemons={allPokemons.length}
                currPage={currentPage}
            />
        </nav>
    );
}