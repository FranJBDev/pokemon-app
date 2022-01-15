import React from 'react'
import style from '../css/Pages.module.css'
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions'

export default function Paginado({ itemsPerPage, allPokemons, page }) {
    const pageNumbers = []
    const dispatch = useDispatch()

    for (let i = 0; i < Math.ceil(allPokemons / itemsPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav><ul className={style.row}>
            {pageNumbers && pageNumbers.map(number => (<li key={number} style={{ listStyle: 'none' }}>
                <button className={style.button} style={page === number ? { color: "red" } : {}} onClick={() => dispatch(setCurrentPage(number))}>{number}</button>
            </li>))}
        </ul>
        </nav>
    )
}