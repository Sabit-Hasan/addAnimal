const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/createAnimal', animalController.createAnimal);
router.get('/', animalController.getAnimals);

module.exports = router;
