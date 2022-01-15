import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, order, getTypes, filterByType, setCurrentPage } from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';

import Navbar from './Navbar';
import noImage from '../assets/no-image.png';
import style from '../css/Home.module.css';
import loading from '../assets/cargando.gif'

export default function Home() {

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const all = useSelector(state => state.allPokemons)
    const types = useSelector(state => state.types)
    const currentPage = useSelector(s => s.currentPage)
    const itemsPerPage = 12

    const pokLoaded = all.length ? true : false
    const [orden, setOrden] = useState('')
    useSelector(s => s.order)

    const currP = allPokemons.slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage)


    const sortOpt = [
        { value: "normal", text: 'Normal' },
        { value: "asc", text: 'A - Z' },
        { value: "desc", text: 'Z - A' },
        { value: "HAttack", text: 'Descendant Attack' },
        { value: "LAttack", text: 'Ascendant Attack' }
    ]

    // const player = document.getElementById("mp3")
    // player.play();

    useEffect(() => {

        //dispatch(removeDetail());
        dispatch(getTypes());
        if (!pokLoaded) {
            dispatch(getPokemons());
        }
    }, [pokLoaded, dispatch])

    useEffect(() => dispatch(setCurrentPage(1)), [dispatch]);

    const handleFilterCreated = (e => dispatch(filterCreated(e.target.value)))

    const handleFilterByType = (e =>
        dispatch(filterByType(e.target.value))
    )

    const handleSort = (e => {
        e.preventDefault();
        dispatch(order(e.target.value));
        dispatch(setCurrentPage(1))
        setOrden(`Ordenado ${e.target.value}`) // Si se omite no se recarga la pagina ordenada
        console.log(orden, order)
    })

    return (<>
        <Navbar />
        <div><select onChange={e => handleSort(e)}>
            {sortOpt.map(el => {
                return (<option value={el.value}>{el.text}</option>)
            })}
        </select>
            <select onChange={e => handleFilterCreated(e)}>
                <option value="All">All</option>
                <option value="Api">API</option>
                <option value="Created">Created</option>
            </select>
            <select onChange={e => handleFilterByType(e)}>
                <option value="All">All types</option>
                {types.map(type => (
                    <option value={type.name} key={type.name}>{type.name}</option>
                ))
                }
            </select>
        </div>

        <div className={style.cards}>
            {currP.length ?
                typeof currP[0] === 'object' ?
                    currP.map(el => {
                        return (<Link to={"/home/" + el.id} key={el.id}>
                            <Card props={el} />
                        </Link>)
                    }) :
                    <div>
                        <img src={noImage} alt="Pokemon not found" width='200px' />
                        <span>{currP[0]} not found</span>
                    </div>
                :
                <div><img src={loading} alt="Loading.." width='250px' />
                    <p>Loading...</p>
                </div>
            }
        </div>
    </>
    )
}
