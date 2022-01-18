import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes, getPokemons } from '../redux/actions';
import validate from './validate.js';
import style from '../css/Create.module.css'
import css from '../css/Button.module.css'
import pos from '../css/Positions.module.css'

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.allPokemons.map(p => p.name))
    const history = useHistory()

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '', hp: '', attack: '', defense: '',
        speed: '', weight: '', height: '', types: [],
    })

    useEffect(() => {
        dispatch(getTypes());
        console.log('types', types)
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input, [e.target.name]: e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }, pokemons))
    }

    function handleChecked(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })

            setErrors(validate({
                ...input,
                types: [...input.types, e.target.value]
            }, pokemons))

        } else if (!e.target.checked) {
            setInput({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            })

            setErrors(validate({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            }, pokemons))
        }
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && input.name.length) {
            dispatch(postPokemon(input));
            dispatch(getPokemons());
            alert("Good job!", "Pokemon created successfuly!", "success");
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                weight: '',
                height: '',
                types: [],
            })
            history.push("/home")
        } else {
            alert("You have errors", "", "error");
        }
    }

    return (
        <>
            <Link to='/home'><button className={css.button + ' ' + pos.e}>Return</button></Link>
            {/* <h2 className={style.h2}>Create pokemon</h2> */}
            <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <label className={style.label}>Name</label><input
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name ? (
                            <p>{errors.name}</p>
                        ) : input.name.length ? <i>Good</i> : <i>Empty</i>
                        }
                    </div>
                    <div>
                        <label className={style.label}>Hp</label>
                        <input
                            type="number"
                            value={input.hp}
                            name="hp"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.hp ? (
                            <p>{errors.hp}</p>
                        ) :
                            input.hp.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                    <div>
                        <label className={style.label}>Attack</label>
                        <input
                            type="number"
                            value={input.attack}
                            name="attack"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.attack ? (
                            <p>{errors.attack}</p>
                        ) :
                            input.attack.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                    <div >
                        <label className={style.label}>Defense</label>
                        <input
                            type="number"
                            value={input.defense}
                            name="defense"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.defense ? (
                            <p>{errors.defense}</p>
                        ) :
                            input.defense.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                </div><div>
                    <div>
                        <label className={style.label}>Speed</label>
                        <input
                            type="number"
                            value={input.speed}
                            name="speed"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.speed ? (
                            <p>{errors.speed}</p>
                        ) :
                            input.speed.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                    <div >
                        <label className={style.label}>Weight</label>
                        <input
                            type="number"
                            value={input.weight}
                            name="weight"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.weight ? (
                            <p>{errors.weight}</p>
                        ) :
                            input.weight.length ? <i>Good</i> : <i>  Empty</i>

                        }
                    </div>
                    <div>
                        <label className={style.label}>Height</label>
                        <input
                            type="number"
                            value={input.height}
                            name="height"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.height ? (
                            <p>{errors.height}</p>
                        ) :
                            input.height.length ? <i>Good</i> : <i>  Empty</i>
                        }

                    </div>
                </div>
                <div
                    className={style.checks}
                >
                    <div
                    // className={pos.d}
                    >
                        <h2 align='left'>Choose up to 2 Pokemon types</h2>
                        {types.map(type => (
                            <label for={type.name}>
                                <input
                                    type="checkbox"
                                    id={type.name}
                                    value={type.name}
                                    onChange={(e) => handleChecked(e)}
                                />
                                {type.name}
                            </label>
                        ))
                        }
                        <div>{errors.types ? (
                            <p>{errors.types}</p>
                        ) :
                            <p>Select only two</p>
                        }</div>
                    </div>

                </div>

                <div>
                    <button className={css.button + ' ' + pos.f} type='submit'>Create</button>
                </div>
            </form>
        </>
    )
}
