import React from 'react'
import style from '../css/Pages.module.css'
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions'

export default function Paginado({ itemsPerPage, allPokemons, currPage }) {
    const pages = []
    const dispatch = useDispatch()

    for (let i = 0; i < Math.ceil(allPokemons / itemsPerPage); i++) {
        pages.push(i + 1)
    }

    return (
        <nav><ul className={style.row}>
            {pages && pages.map(el => (<li key={el} style={{ listStyle: 'none' }}>
                <button className={style.button} style={currPage === el ? { color: "red" } : {}} onClick={() => dispatch(setCurrentPage(el))}>{el}</button>
            </li>))}
        </ul>
        </nav>
    )
}