

export default function validate(poke, pokemons) {
    // Max-min stat values
    const maxMinStats = {
        HP:
        {
            Lowest: 1, //- Shedinja 292

            Highest: 252 // Blissey 714 ( HP EVs, 31 HP IVs)
        },
        Attack: {
            Lowest: 4, //- Chansey & Happiny: 4 (0 Atk EVs, 0 Atk IVs, -Atk, -6)

            Highest: 2024 // - Deoxys-A: 3024 (252 Atk EVs, 31 Atk IVs, Choice Band, +Atk, +6)
        },
        Defense: {
            Lowest: 4, // - Chansey & Happiny: 4 (0 Def EVs, 0 Def IVs, -Def, -6)

            Highest: 2760 // - Onix: 2760 (252 Def EVs, 31 Def IVs, +Def, +6, Eviolite)
        },
        SpecialAttack: {
            Lowest: 10, // - Feebas, Shuckle, Munchlax: 10 (0 SAtk EVs, 0 SAtk IVs, -SAtk)

            Highest: 3024 // - Deoxys-A: 3024 (252 SAtk EVs, 31 SAtk IVs, Choice Specs, +SAtk, +6)
        },
        SpecialDefense: {
            Lowest: 22,// - Caterpie, Weedle, Magikarp, Igglybuff, Carvanha, Deoxys-A: 22 (0 SDef EVs, 0 SDef IVs, -SDef, -6)

            Highest: 5526 // - Shuckle: 5526 (252 SDef EVs, 31 SDef IVs, +SDef, +6, Sand, Assault Vest)
        },
        Speed: {
            Lowest: 2, // - Shuckle, Munchlax: 2 (0 Spd EVs, 0 Spd IVs, - Spd, Macho Brace, -6)
            Highest: 8664 //- Floatzel: 8664 (Swift Swim, 252 Spd EVs, 31 Spd IVs, + Spd, +6, Choice Scarf, Tailwind)
        }

    }


    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/; // Solo permite letras del alfabeto

    if (!poke.name) {
        errors.name = 'A name is required'
    }
    if (pokemons.indexOf(poke.name) !== -1) {
        errors.name = 'A pokemon with that name is already existing'
    }
    if (!RegExpression.test(poke.name)) {
        errors.name = 'Numbers or special characters are not allowed'
    }
    if (poke.name.length > 10) {
        errors.name = `The name can't be longer than 10 characters`
    }

    if (poke.hp < maxMinStats.HP.Lowest) {
        errors.hp = 'The life of the Pokemon must be higher than ' + maxMinStats.HP.Lowest
    }
    if (poke.hp > maxMinStats.HP.Highest) {
        errors.hp = 'The life of the Pokemon must be less than 150'
    }

    if (poke.attack < 1) {
        errors.attack = 'The attack of the Pokemon must be higher than 1'
    }
    if (poke.attack > 200) {
        errors.attack = 'The attack of the Pokemon must be less than 200'
    }
    if (poke.defense < 1) {
        errors.defense = 'The defense of the Pokemon must be higher than 1'
    }
    if (poke.defense > 200) {
        errors.defense = 'The defense of the Pokemon must be less than 200'
    }
    if (poke.speed < 1) {
        errors.speed = 'The speed of the Pokemon must be higher than 1'
    }
    if (poke.speed > 100) {
        errors.speed = 'The speed of the Pokemon must be less than 100'
    }

    if (poke.weight < 1) {
        errors.weight = 'The weight of the Pokemon must be higher than 1'
    }
    if (poke.weight > 1500) {
        errors.weight = 'The weight of the Pokemon must be less than 1500'
    }

    if (poke.height < 1) {
        errors.height = 'The height of the Pokemon must be higher than 1' // fixed
    }
    if (poke.height > 80) {
        errors.height = 'The height of the Pokemon must be less than 80'
    }

    if (!poke.types.length) {
        errors.types = 'Must choose a pokemon type'
    }
    if (poke.types.length > 2) {
        errors.types = `You can't choose more than 2 types per Pokemon`
    }

    return errors;
}