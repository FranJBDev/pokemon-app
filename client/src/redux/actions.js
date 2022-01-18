import axios from 'axios'
// Actions

export function getPokemons() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/pokemons", {

        })

        return dispatch({
            type: "GET_POKEMONS",
            payload: json.data
        })
    }
}

export function reload() {
    return {
        type: "RELOAD_POKEMONS",
    }
}

export function getTypes() {
    return async function (dispatch) {
        var info = await axios.get("http://localhost:3001/types", {

        })

        return dispatch({
            type: "GET_TYPES",
            payload: info.data
        })
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const pokemon = await axios.post("http://localhost:3001/pokemons", payload)

        return {
            type: "POST_POKEMON",
            payload: pokemon
        }
    }
}

export function getOnePokemon(arg) {
    return function (dispatch) { // with promises
        axios.get("http://localhost:3001/pokemons?name=" + arg)
            .then(json => {
                return dispatch({
                    type: "GET_POKEMON_NAME",
                    payload: json.data
                })

            }).catch(err => {
                console.log('Error in getOnePokemon()', err)
                return dispatch({
                    type: "GET_POKEMON_NAME",
                    payload: ['Pokemon']
                })
            })
    }
    // with async await
    //     return async function (dispatch) {
    //         try {
    //             const json = await axios.get("http://localhost:3001/pokemons?name=" + arg)

    //             return dispatch({
    //                 type: "GET_POKEMON_NAME",
    //                 payload: json.data
    //             })
    //         } catch (error) {
    //             console.log('cliente error, error')
    //             return dispatch({
    //                 type: "GET_POKEMON_NAME",
    //                 payload: ['Pokemon']
    //             })
    //         }
    //     }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/pokemons/" + id);

            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByType(payload) {
    return {
        type: "FILTER_BY_TYPES",
        payload
    }
}

export function filterCreated(payload) {

    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function order(payload) {

    return {
        type: "ORDER",
        payload
    }
}
export function setCurrentPage(payload) {
    return {
        type: 'SET_PAGE',
        payload
    }
}
