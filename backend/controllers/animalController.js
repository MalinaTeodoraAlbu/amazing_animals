const Animal = require('../model/Animals');
const { animalCollection } = require('../routers/mainRouter');
const ObjectId = require("mongodb").ObjectId;

const fs = require('fs');
const path = require('path');

const deleteImages = (imagePaths) => {
    imagePaths.split(',').forEach((path) => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Deleted file ${path}`);
        }
      });
    });
};


// Create a new animal
const insertAnimalIntoDB = async (req, res, next) => {
    try {
      let newAnimal = new Animal({
        name: req.body.name,
        species: req.body.species,
        sex: req.body.sex,
        color: req.body.color,
        birthday: req.body.birthday,
        weight: req.body.weight,
        userid: req.body.userid,
        sterilizer: req.body.sterilizer
      });
      console.log(newAnimal)

      if (req.file) {
        let pathImage = (req.file.path).replaceAll("\\", "/");
        newAnimal.imagePaths =pathImage;
      }
      const result = await animalCollection.insertOne(newAnimal)
      await newAnimal.save();
      res.status(200).send(result)
    } catch (err) {
      res.status(500).send(err);
      console.log(err)
    }
};


//update animal
const updateAnimal = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const animal = await animalCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!animal) {
      return res.status(404).json({ error: 'Old animal not found' });
    }

    console.log(id)
    let updateAnimal = new Animal({
      _id: id,
      userid: req.body.userid,
      name: req.body.name,
      species: req.body.species,
      sex: req.body.sex,
      color: req.body.color,
      birthday: req.body.birthday,
      weight: req.body.weight,
      sterilizer: req.body.sterilizer,

    });
    console.log(updateAnimal)
    if (req.file) {
      let pathImage = (req.file.path).replaceAll("\\", "/");
      updateAnimal.imagePaths =pathImage;
      deleteImages(animal.imagePaths)
    }
    else{
      updateAnimal.imagePaths =animal.updateUser;
    }
     
      
      const result = await animalCollection.findOneAndUpdate(
        { _id: id },
        { $set: updateAnimal },
        { returnDocument : "after" },
        { returnOriginal: false }
      );
      if (!result.value) {
        return res.status(404).send('animal not found');
      }
      res.status(200).send(result.value);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get an animal by id
const getTheAnimalByID = async (req, res) => {
  try {
    const animalID = new ObjectId(req.params.animalID);
    const animal = await animalCollection.findOne({ _id: animalID });
    if (animal) {
      res.status(200).send(animal);
    } else {
      res.status(404).send('Animal not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};



//delete animal
const deteleAnimal = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const deleteAnimal = await animalCollection.deleteOne({ _id: id});
    res.status(200).send(deleteAnimal);
  } catch (error) {
    res.status(500).send(error);
  }
};



//get all animals  for a user
const getTheAllAnimalsByUserID = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    
    const animals = await animalCollection.find({userid :userId}).toArray();

    res.status(200).json(animals);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

  // Get all animals
  const getAllTheAnimals =  async (req, res) => {
    try {
      const animals = await animalCollection.find().toArray();
      res.status(200).send(animals);
    } catch (error) {
      res.status(500).send(error);
    }
  };


module.exports = {insertAnimalIntoDB, 
  getTheAnimalByID, deteleAnimal, getTheAllAnimalsByUserID, updateAnimal, getAllTheAnimals}