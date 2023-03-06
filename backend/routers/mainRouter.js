import express from 'express';
import { ObjectId } from 'mongodb';
import User from '../model/User.js';
import Post from '../model/Post.js';
import Comment from '../model/Comment.js';
import PostComment from '../model/JoinPostComment.js';
import mongoose from 'mongoose';
import Animal  from '../model/Animals.js';
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
const commentPostCollection = dbo.collection('JoinPostComment');
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
mainRouter.get('/users/:userid', async (req, res) => {
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


// Get a post by id
mainRouter.get('/posts/:id', async (req, res) => {
  try {
    const post = await postCollection.findOne({ _id: ObjectId(req.params.id) });
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


//update post 
mainRouter.put('/posts/:id', async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatePost);
  } catch (error) {
    res.status(500).send(error);
  }
});


//delete post
mainRouter.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all comments
mainRouter.get('/comments', async (req, res) => {
  try {
    const comments = await commentCollection.find().toArray();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new comment
mainRouter.post('/comments', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const result = await commentCollection.insertOne(newComment);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a comment by id
mainRouter.get('/comments/:id', async (req, res) => {
  try {
    const comment = await commentCollection.findOne({ _id: ObjectId(req.params.id) });
    if (comment) {
      res.status(200).send(comment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a comment
mainRouter.put('/comments/:id', async (req, res) => {
  try {
    const updatedComment = await commentCollection.findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: req.body }, { returnOriginal: false });
    if (updatedComment) {
      res.status(200).send(updatedComment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a comment
mainRouter.delete('/comments/:id', async (req, res) => {
  try {
    const deletedComment = await commentCollection.findOneAndDelete({ _id: ObjectId(req.params.id) });
    if (deletedComment) {
      res.status(200).send(deletedComment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all comments for a user
mainRouter.get('/users/:userid/comments', async (req, res) => {
  try {
    const comments = await commentCollection.find({ userid: req.params.userid }).toArray();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new comment for a user
mainRouter.post('/users/:userid/comments', async (req, res) => {
  try {
    const newComment = new Comment({ ...req.body, userid: req.params.userid });
    const result = await commentCollection.insertOne(newComment);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a comment by id for a user
mainRouter.get('/users/:userid/comments/:id', async (req, res) => {
  try {
    const comment = await commentCollection.findOne({ _id: ObjectId(req.params.id), userid: req.params.userid });
    if (comment) {
      res.status(200).send(comment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a comment for a user
mainRouter.put('/users/:userid/comments/:id', async (req, res) => {
  try {
    const updatedComment = await commentCollection.findOneAndUpdate({ _id: ObjectId(req.params.id), userid: req.params.userid }, { $set: req.body }, { returnOriginal: false });
    if (updatedComment) {
      res.status(200).send(updatedComment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a comment for a user
mainRouter.delete('/users/:userid/comments/:id', async (req, res) => {
  try {
    const deletedComment = await commentCollection.findOneAndDelete({ _id: ObjectId(req.params.id), userid: req.params.userid });
    if (deletedComment) {
      res.status(200).send(deletedComment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


// Create a new post-comment relationship
mainRouter.post('/posts/:postId/comments/:commentId', async (req, res) => {
  try {
   
    const post = await postCollection.findOne({ _id: req.params.postId });
    if (!post) {
      return res.status(404).send('Post not found');
    }

    
    const comment = await commentCollection.findOne({ _id: req.params.commentId });
    if (!comment) {
      return res.status(404).send('Comment not found');
    }


    const newPostComment = new PostComment({
      postId: req.params.postId,
      commentId: req.params.commentId
    });
    const result = await commentPostCollection.insertOne(newPostComment);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }

});

//get all animals 
mainRouter.get('/users/:userId/animals', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    
    const animals = await animalCollection.find({userid :userId}).toArray();

    res.status(200).json(animals);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// add new animal
mainRouter.post('/animals/:userid', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userid);
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const newAnimal = {...req.body, userid: userId};
    const result = await animalCollection.insertOne(newAnimal);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});




export default mainRouter;
