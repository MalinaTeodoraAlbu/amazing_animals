const express = require('express');
const animalController = require('../controllers/animalController');

const animalRouter = express.Router();
const upload = require('../upload');


animalRouter.post('/animals/:id', 
    upload.single('imagePaths', { name: "imagePaths"}),
    animalController.insertAnimalIntoDB
);

module.exports = animalRouter;