const { Router } = require('express');
const { getByIdOrName, getApiDb, getTypes, } = require('./GetData')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Pokemon, Type } = require('../db.js');

const router = Router();

const random = (arrlength) => {
  let number = Math.floor(Math.random() * arrlength);
  return number
}

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
  let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}/`);
  let p = info.data;

  return {
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
}

const getDbInfo = async () => {
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

router.get("/pokemons", async (req, res) => {
  const name = req.query.name;
  const id = req.query.id;

  const nameOrId = name ? name.toLowerCase() : id ? id : null

  if (nameOrId) { // Si se envio un nombre por query
    const data = await getApiInfo(nameOrId);

    if (data) return res.status(200).send([data]);
    else {
      const dataDb = await getDbInfo();
      const found = dataDb.filter(
        el => el.name.toLowerCase() == name.toLowerCase()
      );

      return found.length //Si encontro algo
        ? res.status(200).send(found)
        : res.status(404).send("Pokemon not found");
    }
  } else { // Si no enviamos los 40 pokemons
    const all = await getAllPokemons();

    return res.status(200).send(all);
  }
});

router.get('/types', async (req, res) => {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
  const types = typesApi.data.results;

  types.forEach(el => {
    Type.findOrCreate({
      where: { name: el.name }
    })
  })

  const allTypes = await Type.findAll();
  return res.send(allTypes);
})

router.post('/pokemons', async (req, res) => {
  const {
    name,
    types,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    createdInDb
  } = req.body;

  const pokemonCreated = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    createdInDb
  })

  const pokemonTypes = await Type.findAll({
    where: { name: types }
  })

  pokemonCreated.addType(pokemonTypes)
  return res.send('Pokemon created successfuly')
})

router.get('/pokemons/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params

  let pokemonInfo;
  if (idPokemon >= 1 && idPokemon <= 898 || idPokemon >= 10001 && idPokemon <= 10220) {
    const pokemonInfo = await getApiInfo(idPokemon)

    return pokemonInfo ?
      res.status(200).send([pokemonInfo]) :
      res.status(404).send('Pokemon not found')
  }

  const pokemonsTotal = await getDbInfo()

  if (!pokemonInfo && idPokemon) {
    const pokemonId = pokemonsTotal.filter(el => el.id == idPokemon)

    return pokemonId.length ?
      res.status(200).send(pokemonId) :
      res.status(404).send('Pokemon not found')
  }
})

module.exports = router;
