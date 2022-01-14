

export default function validate(i, pokemons) {
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;

    if (!i.name) {
        errors.name = 'A name is required'
    }
    if (pokemons.indexOf(i.name) !== -1) {
        errors.name = 'A pokemon with that name is already existing'
    }
    if (!RegExpression.test(i.name)) {
        errors.name = 'Numbers or special characters are not allowed'
    }
    if (i.name.length > 18) {
        errors.name = `The name can't be longer than 18 characters`
    }

    if (i.hp < 1 || i.hp > 150) {
        if (i.hp < 1) {
            errors.hp = 'The life of the Pokemon must be higher than 1'
        }
        if (i.hp > 150) {
            errors.hp = 'The life of the Pokemon must be less than 150'
        }
    }
    if (i.attack < 1 || i.attack > 200) {
        if (i.attack < 1) {
            errors.attack = 'The attack of the Pokemon must be higher than 1'
        }
        if (i.attack > 200) {
            errors.attack = 'The attack of the Pokemon must be less than 200'
        }
    }
    if (i.defense < 1 || i.defense > 200) {
        if (i.defense < 1) {
            errors.defense = 'The defense of the Pokemon must be higher than 1'
        }
        if (i.defense > 200) {
            errors.defense = 'The defense of the Pokemon must be less than 200'
        }
    }
    if (i.speed < 1 || i.speed > 100) {
        if (i.speed < 1) {
            errors.speed = 'The speed of the Pokemon must be higher than 1'
        }
        if (i.speed > 100) {
            errors.speed = 'The speed of the Pokemon must be less than 100'
        }
    }
    if (i.weight < 1 || i.weight > 1500) {
        if (i.weight < 1) {
            errors.weight = 'The weight of the Pokemon must be higher than 1'
        }
        if (i.weight > 1500) {
            errors.weight = 'The weight of the Pokemon must be less than 1500'
        }
    }
    if (i.height < 1 || i.height > 80) {
        if (i.height < 1) {
            errors.height = 'The height of the Pokemon must be higher than 1 dam'
        }
        if (i.height > 80) {
            errors.height = 'The height of the Pokemon must be less than 80 dam'
        }
    }

    if (!i.types.length) {
        errors.types = 'Must choose a pokemon type'
    }
    if (i.types.length > 2) {
        errors.types = `You can't choose more than 2 types per Pokemon`
    }

    return errors;
}