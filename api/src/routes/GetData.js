const axios = require('axios');
const { Pokemon, Type } = require('../db') // importamos modelos


// No borrar 

const get40Urls = async () => {
    // El readme dice que no debemos usar este:
    // const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    // const results = apiUrl.data.results

    let first20 = await axios.get('https://pokeapi.co/api/v2/pokemon')
    let next20 = await axios.get(first20.data.next)

    first20 = first20.data.results
    next20 = next20.data.results

    let urls = [...first20, ...next20].map((e) => (
        { id: e.url.split('/')[6], url: e.url }
        // 'https://pokeapi.co/api/v2/pokemon/id'
    ))

    return await Promise.all(
        urls.map(async e => {
            return await getApiInfo(e.id)
        })
    )
}

const getfirst40Pokes = async () => {
    let arr = [];
    for (let i = 1; i < 41; i++) arr.push(i) // Creo un array y le pusheo del 1 al 40
    return await Promise.all(arr.map(async (i) => await getApiInfo(i)))
}

async function getApiInfo(arg) { // Busca por id o nombre
    try {
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}/`)
        let p = info.data ? info.data : null;

        if (p) return {
            id: p.id,
            name: p.name,
            types: p.types.map((t) => t.type.name),
            img: p.sprites.other['dream_world'].front_default,
            img2: p.sprites.other['official-artwork'].front_default,
            img3: p.sprites.other.home.front_default,
            attack: p.stats[1].base_stat,
            weight: p.weight,
            height: p.height,
            hp: p.stats[0].base_stat,
            attack: p.stats[1].base_stat,
            defense: p.stats[2].base_stat,
            speed: p.stats[5].base_stat,
            weight: p.weight,
            height: p.height,
            base_experience: p.base_experience,
            order: p.order,
            abilities: p.abilities ? p.abilities.map(a => a.ability.name) : null,
            moves: p.moves ? p.moves.map(m => m.move.name) : null
        }
    } catch (err) {
        return null
    }
}

const getDbInfo = async (arg) => {
    const data = (await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })).map(P => {
        const json = P.toJSON();
        return {
            ...json,
            types: json.types.map(type => type.name)
        }
    });

    return data
}

const getAllPokemons = async () => { // Une los pokes de al api y de la BD
    const apiInfo = await getfirst40Pokes();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo];
    // console.log(infoTotal)

    return infoTotal;
}

module.exports = { getApiInfo, getAllPokemons, getDbInfo } //getApiDb