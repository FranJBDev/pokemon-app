import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOnePokemon } from '../redux/actions';
// import style from '../css/SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "))
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== '') {
            dispatch(getOnePokemon(name))
            setName("")
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input

                    type="text"
                    placeholder="Search Pokemon..."
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">
                    <i>Search</i>
                </button>
            </form>
        </div>
    )
}
