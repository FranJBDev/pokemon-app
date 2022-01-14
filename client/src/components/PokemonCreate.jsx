import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes, getPokemons } from '../redux/actions';
import validate from './validate.js';

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.allPokemons.map(pok => pok.name))
    const history = useHistory()

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '', hp: '', attack: '', defense: '',
        speed: '', weight: '', height: '', types: [],
    })

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
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
            alert("You must choose at least one type!", "", "error");
        }
    }

    return (
        <div><Link to='/home'><button>Return</button></Link>
            <div> <h2>Create pokemon</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Name</label><input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name ? (
                        <div>
                            <p>{errors.name}</p>
                        </div>
                    ) : input.name.length ? <i>Good</i> : <i>  Empty</i>
                    }
                    <div>
                        <label>Hp</label>
                        <input
                            type="number"
                            value={input.hp}
                            name="hp"
                            onChange={(e) => handleChange(e)}

                        />
                        {errors.hp ? (
                            <div>
                                <i ></i>
                                <p>{errors.hp}</p>
                            </div>
                        ) :
                            input.hp.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                    <div>
                        <label>Attack</label>
                        <input
                            type="number"
                            value={input.attack}
                            name="attack"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.attack ? (
                            <div>
                                <i></i>
                                <p>{errors.attack}</p>
                            </div>
                        ) :
                            input.attack.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                    <div >
                        <label>Defense</label>
                        <input
                            type="number"
                            value={input.defense}
                            name="defense"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.defense ? (
                            <div>
                                <i ></i>
                                <p>{errors.defense}</p>
                            </div>
                        ) :
                            input.defense.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                    <div>
                        <label>Speed</label>
                        <input
                            type="number"
                            value={input.speed}
                            name="speed"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.speed ? (
                            <div>
                                <i ></i>
                                <p>{errors.speed}</p>
                            </div>
                        ) :
                            input.speed.length ? <i>Good</i> : <i>  Empty</i>
                        }
                    </div>
                    <div >
                        <label>Weight</label>
                        <input
                            type="number"
                            value={input.weight}
                            name="weight"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.weight ? (
                            <div>
                                <i></i>
                                <p>{errors.weight}</p>
                            </div>
                        ) :
                            input.weight.length ? <i>Good</i> : <i>  Empty</i>

                        }
                    </div>
                    <div>
                        <label>Height</label>
                        <input
                            type="number"
                            value={input.height}
                            name="height"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.height ? (
                            <div>
                                <p>{errors.height}</p>
                            </div>
                        ) :
                            input.height.length ? <i>Good</i> : <i>  Empty</i>
                        }

                    </div>
                    <div>
                        <span >Choose up to 2 Pokemon types</span>

                        <div>
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
                        </div>

                        {errors.types ? (
                            <div >
                                <i></i>
                                <span>{errors.types}</span>
                            </div>
                        ) :
                            <i>Select only two</i>
                        }
                    </div>

                    <div>
                        <button type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
