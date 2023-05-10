const User = require('../model/User');
const { userCollection } = require('../routers/mainRouter');
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
const insertUserIntoDB = async (req, res, next) => {
    try {
      
      let newUser = new User({
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        bio: req.body.bio,
        birthday: req.body.birthday,
        userType: req.body.userType
      });

      if (req.file) {
        let pathImage = (req.file.path).replaceAll("\\", "/");
        newUser.imagePaths =pathImage;
      }
      const result = await userCollection.insertOne(newUser)
      await newUser.save();
      res.status(200).send(result)
    } catch (err) {
      res.status(500).send(err);
    }
};

  // Get all users
const getAllUsersFromDB = async (req, res) => {
    try {
      const users = await userCollection.find().toArray();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
};
  
  
  // Get a user by id
const getUserFromDBById = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.userid);
      const user = await userCollection.findOne({ _id: userId });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };


  //update user 
  const updateUser = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const user = await userCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
          return res.status(404).json({ error: 'Old user not found' });
        }
        console.log(id)
        let updateUser = new User({
          _id: id,
          name: req.body.name,
          city: req.body.city,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password,
          bio: req.body.bio,
          birthday: req.body.birthday,
          userType: req.body.userType
        });

        console.log(req.file)
        if (req.file) {
          let pathImage = (req.file.path).replaceAll("\\", "/");
          updateUser.imagePaths =pathImage;
          deleteImages(user.imagePaths)
        }
        else{
          updateUser.imagePaths =user.updateUser;
        }
        const result = await userCollection.findOneAndUpdate(
          { _id: id },
          { $set: updateUser },
          { returnDocument : "after" },
          { returnOriginal: false }
        );
        if (!result.value) {
          return res.status(404).send('User not found');
        }
        res.status(200).send(result.value);
    } catch (err) {
        return res.status(500).json(err);
    }
  }
  



module.exports = {getAllUsersFromDB, getUserFromDBById, insertUserIntoDB, updateUser}