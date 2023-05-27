const express = require('express');
const animalController = require('../controllers/animalController');

const animalRouter = express.Router();
const upload = require('../upload');


animalRouter.post('/animal', 
    upload.single('imagePaths', { name: "imagePaths"}),
    animalController.insertAnimalIntoDB
);

animalRouter.put('/animal/:id', 
    upload.single('imagePaths', { name: "imagePaths"}),
    animalController.updateAnimal
);

animalRouter.get('/animals',
animalController.getAllTheAnimals
); 

animalRouter.get('/animals/:animalID',
animalController.getTheAnimalByID
); 

animalRouter.delete('/animals/:id',
animalController.deteleAnimal
); 


animalRouter.get('/users/:userId/animals',
animalController.getTheAllAnimalsByUserID
);

module.exports = animalRouter;