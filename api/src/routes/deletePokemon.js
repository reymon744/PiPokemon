const router = require("express").Router();
const deletePoke = require('../controllers/deletePoke')

router.delete("/", async (req, res) => {
    try {
        let {name} = req.query
        await deletePoke(name)
        res.send('Pokemon has been exterminated')
    } catch (err) {
        res.status(400).send("Error");
    }
});

module.exports = router;