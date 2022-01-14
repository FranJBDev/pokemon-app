import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByNameOrStrengh, getTypes, removeDetail, filterPokemonsByType, reloadPokemons } from '../actions';
import style from './Home.module.css';

export default function Forms() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orden, setOrden] = useState('')
    const types = useSelector(state => state.types)

    const dispatch = useDispatch()

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterByType(e) {
        dispatch(filterPokemonsByType(e.target.value));
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByNameOrStrengh(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (

        <div className={style.sortfilter}>
            <select onChange={e => handleSort(e)}>
                <option value="normal">Normal</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
                <option value="HAttack">Highest Attack</option>
                <option value="LAttack">Lowest Attack</option>
            </select>
            <select onChange={e => handleFilterCreated(e)}>
                <option value="All">All</option>
                <option value="Api">API</option>
                <option value="Created">Created</option>
            </select>
            <select onChange={e => handleFilterByType(e)}>
                <option value="All">all types</option>
                {
                    types.map(type => (
                        <option value={type.name} key={type.name}>{type.name}</option>
                    ))
                }
            </select>
        </div>
    )
}