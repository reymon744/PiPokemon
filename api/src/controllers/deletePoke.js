const { Pokemon} = require("../db");

const deletePoke = async (name) => {
    try {
        await Pokemon.destroy({
            where: {name}
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = deletePoke