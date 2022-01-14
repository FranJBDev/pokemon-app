import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
// import style from '../css/Navbar.module.css'
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
                <button >Landing</button>
            </Link>
            <SearchBar />
            <Link to="/pokemons"><button>Create</button></Link>
            <button onClick={e => { handleClick(e) }} >Reload</button>

            <Pages itemsPerPage={itemsPerPage}
                allPokemons={allPokemons.length}
                page={currentPage}
            />
        </nav>
    );
}