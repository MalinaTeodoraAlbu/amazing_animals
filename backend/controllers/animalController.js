const Animals = require('../model/Animals');
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


// Create a new user
const insertAnimalIntoDB = async (req, res, next) => {
    try {
        const id = new ObjectId(req.params.id);
      let newAnimal = new User({
        name: req.body.name,
        species: req.body.species,
        sex: req.body.sex,
        color: req.body.color,
        birthday: req.body.birthday,
        weight: req.body.weight,
        userid: id,
        sterilizer: req.body.sterilizer
      });

      if (req.file) {
        let pathImage = (req.file.path).replaceAll("\\", "/");
        newAnimal.imagePaths =pathImage;
      }
      const result = await animalCollection.insertOne(newAnimal)
      await newAnimal.save();
      res.status(200).send(result)
    } catch (err) {
      res.status(500).send(err);
    }
};