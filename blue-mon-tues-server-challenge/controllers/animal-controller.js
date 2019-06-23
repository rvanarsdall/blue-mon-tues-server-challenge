var express = require("../node_modules/express");
var router = express.Router();
var sequelize = require("../db");
var Animal = sequelize.import("../models/animal");

router.post("/create", (req, res) => {
  const newAnimal = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator
  };
  Animal.create(newAnimal)
    .then(animal => {
      res.status(200).json({ animal });
    })
    .catch(err => res.status(500).json({ err: err.mesage }));
});

router.delete("/delete/:id", (req, res) => {
  Animal.destroy({ where: { id: req.params.id } })
    .then(animal => res.status(200).json(animal))
    .catch(err => res.json(req.errors));
});

router.put("/update/:id", (req, res) => {
  Animal.update(req.body, { where: { id: req.params.id } })
    .then(animal => res.status(200).json(animal))
    .catch((err => res.json(req.errors)));
});
module.exports = router;
