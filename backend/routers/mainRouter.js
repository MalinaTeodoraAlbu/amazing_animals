import express from 'express';
import User from '../model/User.js';
import Post from '../model/Post.js';
import mongoose from 'mongoose';
const mainRouter = express.Router();

import { MongoClient } from 'mongodb';
const url = "mongodb+srv://albumalina26:Malina260401@amazinganimalscluster.iooj9n4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(()=>console.log('connected mongoose'))
.catch(e=>console.log(e));

const mongoClient = new MongoClient(url);
async function run() {
  try {
      await mongoClient.connect();
      console.log("Connected correctly to server");
  } catch (err) {
      console.log(err.stack);
  }
}
run().catch(console.dir);

const dbo = mongoClient.db('AmazingAnimalsDB')
const userCollection = dbo.collection('User');
const postCollection = dbo.collection('Post');
const commentCollection = dbo.collection('Comment');
const animalCollection = dbo.collection('Animal');
const medicalRecordCollection = dbo.collection('Medical Record');


// Get all users
mainRouter.get('/users', async (req, res) => {
  try {
    const users = await userCollection.find().toArray();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a user by id
mainRouter.get('/users/:id', async (req, res) => {
  try {
    const user = await userCollection.findOne({ _id: ObjectId(req.params.id) });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new user
mainRouter.post('/users', async (req, res, next) => {
  try {
    const newUsers = new User(req.body)
    const result = await userCollection.insertOne(newUsers)
    await newUsers.save();
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err);
  }
});

//update user 
mainRouter.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});


//delete user
mainRouter.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});



// Get all posts
mainRouter.get('/posts', async (req, res) => {
  try {
    const posts = await postCollection.find().toArray();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new post
mainRouter.post('/posts', async (req, res, next) => {
  try {
    const newPost = new Post(req.body)
    const result = await postCollection.insertOne(newPost)
    await newPost.save();
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err);
  }
});


export default mainRouter;
