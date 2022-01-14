const axios = require('axios');
const { Pokemon, Type } = require('../db') // importamos modelos

const getApiDataWithNext = async (url) => {
    let first20 = await axios.get('https://pokeapi.co/api/v2/pokemon')
    let next20 = await axios.get(first20.data.next)

    first20 = first20.data.results
    next20 = next20.data.results

    // console.log(first20, next20)

    let urls = first20.concat(next20)

    // Agregar las demas propiedades a los pokemons
    urls = urls.map((e) => (
        { id: e.url.split('/')[6], url: e.url }
    ))

    return await Promise.all(
        urls.map(async e => {
            return await getByIdOrName(e.id)

        })
    )
}

const getApiData = async (offset, limit) => {
    let urls = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

    // Agregar las demas propiedades a los pokemons
    urls = urls.data.results.map((e) => (
        { id: e.url.split('/')[6], url: e.url }
    ))

    return await Promise.all(
        urls.map(async e => {
            return await getByIdOrName(e.id)

        })
    )
}

const getDbInfo = async () => ( // Obtenemos la info de la bd
    (await Pokemon.findAll({ // Todos los pokemons con su tipo relacionado
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    }))
    // .map(e => {
    //     const json = e.toJSON();
    //     return {
    //         ...json,
    //         types: json.types.map(type => type.name)
    //     }
    // })
)

const getTypes = async () => {
    let types = await axios.get('https://pokeapi.co/api/v2/type')

    return types.data.results
}

const getApiDb = async () => {
    const apiInfo = await getApiDataWithNext() // getApiData(0, 48)
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)

    return infoTotal
}

const getByIdOrName = async (arg) => {
    let results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}/`)

    results = results.data

    return {

        id: results.id,
        name: results.name,
        types: results.types.map((t) => t.type.name),
        img: results.sprites.other['dream_world'].front_default,
        img2: results.sprites.other['official-artwork'].front_default,
        img3: results.sprites.other.home.front_default,
        hp: results.stats[0].base_stat,
        attack: results.stats[1].base_stat,
        defense: results.stats[2].base_stat,
        speed: results.stats[5].base_stat,
        weight: results.weight,
        height: results.height,
        base_experience: results.base_experience,
        order: results.order,
        abilities: results.abilities
    }
}

module.exports = { getByIdOrName, getApiDb, getTypes } //getApiDb