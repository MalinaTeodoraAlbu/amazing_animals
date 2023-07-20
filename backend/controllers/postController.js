const Post = require('../model/Post')
const { postCollection } = require('../routers/mainRouter');
const {NotificationsCollection} = require('../routers/mainRouter')
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



const insertPostIntoDB = async (req, res, next) => {
    try {
      console.log(req.body);
      let newPost = new Post({
        content: req.body.content,
        location: req.body.location,
        category: req.body.category,
        tag: req.body.tag,
        datePosted: req.body.datePosted,
        userid: req.body.userid,
        picture: req.body.picture,
        name: req.body.name,
        species: req.body.species,
        sex: req.body.sex,
        color: req.body.color,
        birthday: req.body.birthday,
        weight: req.body.weight,
        sterilizer: req.body.sterilizer,
        
      });

      if (req.file) {
        let pathImage = (req.file.path).replaceAll("\\", "/");
        newPost.imagePaths =pathImage;
      }
      const result = await postCollection.insertOne(newPost)
      await newPost.save();

      const similarPosts = await postCollection.find({
        $and: [
          { species: { $ne: undefined } },
          { sex: { $ne: undefined } },
          { color: { $ne: undefined } },
          { location: { $ne: undefined } }
        ],
        userid: { $ne: newPost.userid }
      }).toArray();
  
      if (similarPosts.length >= 3 ) {
        console.log('Postări asemănătoare:', similarPosts);
        
        for (const post of similarPosts) {
          console.log(post.userid)
          console.log(newPost.userid)
          if (post.userid !== newPost.userid) {
            const newNotification = {
              idPOST: newPost._id,
              idUSER: newPost.userid,
              ownerId: post.userid,
              type: 'alike',
              isview: false,
              createdAt: new Date(),
            };
            await NotificationsCollection.insertOne(newNotification);
          }
        }
      }
     
      res.status(200).send(result)
    } catch (err) {
      res.status(500).send(err);
      console.log(err)
    }
};


//update post 
const updatePost = async (req, res, next) => {
    try {
      const id = new ObjectId(req.params.id);
      const post = await postCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!post) {
        return res.status(404).json({ error: 'Old post not found' });
      }

      console.log(id)
      let updatePost = new Post({
        _id: id,
        content: req.body.content,
        location: req.body.location,
        category: req.body.category,
        tag: req.body.tag,
        datePosted: req.body.datePosted,
        userid: req.body.userid,
        name: req.body.name,
        species: req.body.species,
        sex: req.body.sex,
        color: req.body.color,
        birthday: req.body.birthday,
        weight: req.body.weight,
        sterilizer: req.body.sterilizer,
        
      });
      console.log(updatePost)
      if (req.file) {
        let pathImage = (req.file.path).replaceAll("\\", "/");
        updatePost.imagePaths =pathImage;
        if(post.imagePaths){
          deleteImages(post.imagePaths)
        }
       
      }
      else{
        updatePost.imagePaths =post.imagePaths;
      }
       
        const result = await postCollection.findOneAndUpdate(
          { _id: id },
          { $set: updatePost },
          { returnDocument : "after" },
          { returnOriginal: false }
        );
        if (!result.value) {
          return res.status(404).send('Post not found');
        }
        res.status(200).send(result.value);
    } catch (err) {
      res.status(500).send(err);
    }
};

//delete post
const detelePost = async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);
      const post = await postCollection.deleteOne({ _id: id});
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  };


  // Get all posts
const getAllPosts =  async (req, res) => {
    try {
      const posts = await postCollection.find().toArray();
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // Get all posts for a user
const getAllPostByUserIS =  async (req, res) => {
    try {
      const userId = new ObjectId(req.params.userid);
      const posts = await postCollection.find({ userid: userId }).toArray();
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
  };


  // Get an post by id
const getThePostByID =  async (req, res) => {
    try {
      const postID = new ObjectId(req.params.postid);
      const post = await postCollection.findOne({ _id: postID });
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(404).send('Post not found');
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  module.exports = {getAllPostByUserIS ,detelePost, getAllPosts, insertPostIntoDB, updatePost, getThePostByID}