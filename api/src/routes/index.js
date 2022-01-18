const { Router } = require('express');
const { getApiInfo, getAllPokemons, getDbInfo, } = require('./GetData')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');

const { Pokemon, Type } = require('../db.js');

const router = Router();

const random = (arrlength) => {
  let number = Math.floor(Math.random() * arrlength);
  return number
}


router.get("/pokemons", async (req, res) => {
  const name = req.query.name;
  const id = req.query.id;

  const nameOrId = name ? name.toLowerCase() : id ? id : null

  if (nameOrId) { // Si se envio un nombre or id por query
    const data = await getApiInfo(nameOrId);

    if (data) return res.status(200).send([data]);
    else {
      const dataDb = await getDbInfo(nameOrId);
      const found = dataDb.filter(
        el => el.name.toLowerCase() == name.toLowerCase()
      );

      console.log

      return found.length //Si encontro algo
        ? res.status(200).send(found)
        : res.status(404).send("Pokemon not found");
    }
  } else { // Si no, se envio nombre o id por query, enviamos los 40 pokemons    
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
    name, types, hp, attack, defense, speed, height, weight, img, createdInDb
  } = req.body;

  if (name === null) return res.status(404).send("Error: Name is null")
  const pokeName = await Type.findOne({
    where: { name: name }
  })
  if (pokeName) return res.status(404).send("Error: Name is repeated")

  const pokemonCreated = await Pokemon.create({
    name, hp, attack, defense, speed, height, weight, img, createdInDb
  })

  const pokemonTypes = await Type.findAll({
    where: { name: types }
  })
  // if (!Type.name) throw

  pokemonCreated.addType(pokemonTypes)
  return res.send('Pokemon created successfuly')
})

router.get('/pokemons/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params

  let pokemonInfo;
  if (idPokemon >= 1 && idPokemon <= 898 || idPokemon >= 10001 && idPokemon <= 10220) {
    const pokemonInfo = await getApiInfo(idPokemon)

    return pokemonInfo ?
      res.status(200).send([pokemonInfo]) : null
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
