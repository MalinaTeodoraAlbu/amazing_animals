const express = require('express');
const { ObjectId } = require('mongodb');
const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const MedicalRecord = require('../model/MedicalRecord');
const SavedPost = require('../model/SavedPost');
const mongoose = require('mongoose');
const mainRouter = express.Router();

const { MongoClient } = require('mongodb');

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
const savedPostsCollection = dbo.collection('Saved Posts');
const FriendsCollection = dbo.collection('Friends');
const ConversationCollection = dbo.collection('Conversations');
const MessagesCollection = dbo.collection('Messages');


mainRouter.put('/comments/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
      const body = req.body;
      const updateComment = await commentCollection.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { returnDocument : "after" },
        { returnOriginal: false }
      );
      if (!updateComment.value) {
        return res.status(404).send('Post not found');
      }
      res.status(200).send(updateComment.value);
  } catch (error) {
    res.status(500).send(error);
  }
});






//delete savedPost
mainRouter.delete('/savedPost/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const savedPost = await savedPostsCollection.deleteOne({ _id: id});
    res.status(200).send(savedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});





//delete comment 
mainRouter.delete('/comments/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const comment = await commentCollection.deleteOne({ _id: id});
    res.status(200).send(comment);
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


mainRouter.post('/savedPost', async (req, res) => {
  try {
    const newSavedPost = new SavedPost(req.body);
    const result = await savedPostsCollection.insertOne(newSavedPost);
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

// Get a saved post by id
mainRouter.get('/savedPost/:id', async (req, res) => {
  try {
    const savedPost = await savedPostsCollection.findOne({ _id: ObjectId(req.params.id) });
    if (savedPost) {
      res.status(200).send(savedPost);
    } else {
      res.status(404).send('Saved Post not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


mainRouter.get('/comments/:postid/post', async (req, res) => {
  try {
    const postId = new ObjectId(req.params.postid);
    const comment = await commentCollection.find({ postID: postId }).toArray();
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});


//get all saved posts 
mainRouter.get('/users/:userId/savedPosts', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    
    const savedPosts = await savedPostsCollection.find({userID :userId}).toArray();

    res.status(200).json(savedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});




// Create a new medical record
mainRouter.post('/medicalRecord', async (req, res, next) => {
  try {
    const newMedical = new MedicalRecord(req.body)
    const result = await medicalRecordCollection.insertOne(newMedical)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err);
  }
});



// Get all medical records for an animal
mainRouter.get('/animals/:animalid/medicalR', async (req, res) => {
  try {
    const animalID = new ObjectId(req.params.animalid);
    const medical = await medicalRecordCollection.find({ animalId: animalID }).toArray();
    res.status(200).send(medical);
  } catch (error) {
    res.status(500).send(error);
  }
});








mainRouter.post('/login', async (req, res, next) => {
  try {
     
      const { email, password } = req.body;
      console.log(email,password)
      const user = await userCollection.findOne({ email: email });
      
      if(user) {
        if(password == user.password){
          res.status(200).json({ success: true, _id: user._id });
        } else {
              res.status(401).json({ success: false, message: "Invalid email or password" });
          }

      } else {
          res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  } catch (err) {
      next(err)
  }
});

mainRouter.get('/users/email/:emailUser', async (req, res, next) => { 
  try {
    const userEmail = req.params.emailUser;
    const user = await userCollection.findOne({ email: userEmail });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ error: `User with email ${req.params.userEmail} not found` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//get friends
mainRouter.get("/friends/:userId", async (req, res) => {
  try {
    const user = await userCollection.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return userCollection.findOne({ _id: friendId });
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, name, imagePaths } = friend;
      friendList.push({ _id, name, imagePaths });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
mainRouter.put("/:id/follow", async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const idUser = new ObjectId(req.params.id);
      const idUserCurent = new ObjectId(req.body._id);
      const user = await userCollection.findOne({ _id: idUser });
      const currentUser = await userCollection.findOne({ _id: idUserCurent});
      console.log(currentUser
        )
      console.log("req.body._id", idUserCurent);
      console.log("user", user);
      console.log("user.followers", user?.followers);

      if (user && user.followers && !user.followers.includes(idUserCurent)) {
        await userCollection.updateOne(
          { _id: idUserCurent },
          { $push: { followings: idUser } }
        );
        await userCollection.updateOne(
          { _id: idUser },
          { $push: { followers: idUserCurent } }
        );
        
        res.status(200).json("User has been followed.");
      } else {
        res.status(403).json("You already follow this user.");
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } else {
    res.status(403).json("You can't follow yourself.");
  }
});



// unfollow a user
mainRouter.put("/:id/unfollow", async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const idUser = new ObjectId(req.params.id);
      const user = await userCollection.findOne({ _id: idUser });
      const currentUser = await userCollection.findOne({ _id: req.body._id });
      if (user.followers.includes(req.body._id)) {
        await userCollection.updateOne(
          { _id: idUser },
          { $pull: { followers: req.body._id } }
        );
        await userCollection.updateOne(
          { _id: req.body._id },
          { $pull: { followings: idUser } }
        );
        res.status(200).json("User has been unfollowed.");
      } else {
        res.status(403).json("You don't follow this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself.");
  }
});

module.exports = {mainRouter, userCollection, savedPostsCollection, 
  postCollection, commentCollection, FriendsCollection,
   medicalRecordCollection, animalCollection, ConversationCollection, MessagesCollection};
