const express = require('express');
const { ObjectId } = require('mongodb');
const cron = require('node-cron');
const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const MedicalRecord = require('../model/MedicalRecord');
const SavedPost = require('../model/SavedPost');
const Pacient = require('../model/Pacient')
const mongoose = require('mongoose');
const mainRouter = express.Router();

const { MongoClient } = require('mongodb');
const Subscription = require('../model/Subscription ');
const Advertising = require('../model/Advertising');

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
const NotificationsCollection = dbo.collection("Notifications");
const SubscriptionCollection = dbo.collection("Subscription");
const AdvertisingCollection = dbo.collection("Advertising");
const PacientCollection = dbo.collection("Pacienti");




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



mainRouter.put('/medicalRecord/:id', async (req, res) => {
  try {
      const id = new ObjectId(req.params.id);
      const body = {
        animalId: new ObjectId(req.body.animalId),
        content : req.body.content,
        repeat: req.body.repeat,
        title: req.body.content,
        date: req.body.date,
        dateRepeat: req.body.dateRepeat,
        repeatTimes: req.body.repeatTimes
      }
      
      const medicalRecord = await medicalRecordCollection.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { returnDocument : "after" },
        { returnOriginal: false }
      );
      if (!medicalRecord.value) {
        return res.status(404).send('Post not found');
      }
      res.status(200).send(medicalRecord.value);
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
});

mainRouter.put('/subscription/:id', async (req, res) => {
  
  try {
      const id = new ObjectId(req.params.id);
      const userID = new ObjectId(req.body.userid)

      const updateSubscription = await SubscriptionCollection.findOneAndUpdate(
        { _id: id },
        { $set: { 
          subscriptionType: req.body.subscriptionType,
          startDate: req.body.startDate,
          price: req.body.price,
          userid: userID,
          status: req.body.status,
          nextBillingDate: req.body.nextBillingDate
        } },
        { returnDocument: "after" }
      );
      if (!updateSubscription.value) {
        return res.status(404).send('Subscription not found');
      }
      res.status(200).send(updateSubscription.value);
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
});



const checkAndAddRenewNotification = async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

    const subscriptions = await SubscriptionCollection.find({}).toArray();
    for (const subscription of subscriptions) {
      const nextBillingDate = new Date(subscription.nextBillingDate);
      nextBillingDate.setHours(0, 0, 0, 0); 

      if (currentDate.getTime() === nextBillingDate.getTime()) {
        const ownerID = new ObjectId(subscription.userid);
        const newNotification = {
          ownerId: ownerID,
          type: 'renew_subscription',
          isview: false,
          createdAt: new Date()
        };

        await NotificationsCollection.insertOne(newNotification);
   

        const user = await userCollection.findOne({ _id: ownerID });
        const subscription = await SubscriptionCollection.findOne({userid : ownerID})
        const result = await userCollection.findOneAndUpdate(
          { _id: ownerID },
          { $set: { userType: "Standard" } },
          { returnDocument: "after" }
        );

        const resultSub = await SubscriptionCollection.findOneAndUpdate(
          { _id: subscription._id },
          { $set: { status: "Canceled" } },
          { returnDocument: "after" }
        );


      }
    }
  } catch (error) {
    console.log('Error adding renew subscription notification:', error);
  }
};


cron.schedule('50 11 * * *', checkAndAddRenewNotification);


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


mainRouter.delete('/pacient/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const pacient = await PacientCollection.deleteOne({ pacientID: id});
    res.status(200).send(pacient);
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

mainRouter.delete('/medicalRecord/:id', async (req, res) => {
  try {

    const id = new ObjectId(req.params.id);
    const medicalRecorde = await medicalRecordCollection.deleteOne({ _id: id});
    console.log(medicalRecorde)
    res.status(200).send(medicalRecorde);
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
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

mainRouter.put("/notifications/:id", async (req, res) => {
  const id = req.params;
  const  {isview } = req.body;
  console.log(isview)
  console.log(id)
  try {
    const notification = await NotificationsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { isview: isview } },
    );
  console.log(notification)
    if (notification) {
      res.status(200).send("Notification updated successfully");
    } else {
      res.status(404).send("Notification not found");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});  


mainRouter.get("/notifications", async(req, res) => {
  try{
    const notifications = await NotificationsCollection.find().toArray();
    res.status(200).send(notifications);
  }catch (error){
    res.status(500).send(error)
    console.log(err)
  }
})

// Get all 
mainRouter.get('/subscriptions', async (req, res) => {
  try {
    const subscription = await SubscriptionCollection.find().toArray();
    res.status(200).send(subscription);
  } catch (error) {
    res.status(500).send(error);
  }
});

mainRouter.get("/notifications", async(req, res) => {
  try{
    const notifications = await NotificationsCollection.find().toArray();
    res.status(200).send(notifications);
  }catch (error){
    res.status(500).send(error)
    console.log(err)
  }
})


// Create a new comment
mainRouter.post('/comments', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    newComment.createdAt = new Date(); 
    const result = await commentCollection.insertOne(newComment);

    const post = await postCollection.findOne({ _id: new ObjectId(newComment.postID) });

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
  
    if(newComment.userid !==post.userid){
      const newNotification = {
        idPOST: newComment.postID,
        idUSER: newComment.userid,
        ownerId: post.userid, 
        type: 'comment',
        isview: false,
        createdAt: new Date()
      };
      await NotificationsCollection.insertOne(newNotification);
    }
    
    console.log(newComment)
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err)
  }
});



mainRouter.post('/ADDsubscription', async (req, res) => {
  try {
    
    const newSubscription = new Subscription({
      subscriptionType :req.body.subscriptionType,
      startDate:req.body.startDate,
      price:req.body.price,
      userid : new ObjectId(req.body.userid),
      status:req.body.status,
      nextBillingDate:req.body.nextBillingDate
    });

    const result = await SubscriptionCollection.insertOne(newSubscription);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});


mainRouter.post('/pacient', async (req, res) => {
  try {
    const pacient = new Pacient({
      medicID : new ObjectId(req.body.medicID),
      pacientID : new ObjectId(req.body.pacientID)
    });

    const result = await PacientCollection.insertOne(pacient);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
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


// Get a medical by id
mainRouter.get('/medicalRecord/:id', async (req, res) => {
  const id =  new ObjectId(req.params.id);
  try {
    const medicalRecord = await medicalRecordCollection.findOne({ _id: id });
    if (medicalRecord) {
      res.status(200).send(medicalRecord);
    } else {
      res.status(404).send('medicalRecord not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

mainRouter.get('/subscription/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const subscription = await SubscriptionCollection.findOne({ _id: id });
    if (subscription) {
      res.status(200).send(subscription);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


mainRouter.get('/notifications/:id/not', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const notifications = await NotificationsCollection.findOne({ _id: id });
    if (notifications) {
      res.status(200).send(notifications);
    } else {
      res.status(404).send('notifications not found');
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
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

//get all 
mainRouter.get('/users/:userId/subscription', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    const subscriptions = await SubscriptionCollection.findOne({ userid: userId });
    res.status(200).json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

mainRouter.get('/subscription/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const subscription = await SubscriptionCollection.findOne({ _id: id });
    if (subscription) {
      res.status(200).send(subscription);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


mainRouter.post('/addNotificationRenew',  async (req, res, next) => {
  try {
    const onerID = new ObjectId(req.body.ownerId);
    const newNotification = {
      ownerId: onerID, 
      type: 'renew_subscription',
      isview: false,
      createdAt: new Date()
    };

    await NotificationsCollection.insertOne(newNotification);
    res.status(200).send(newNotification);
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
}
)


// Create a new medical record
mainRouter.post('/medicalRecord', async (req, res, next) => {
  try {
    
    const newMedical = new MedicalRecord(req.body)
    const result = await medicalRecordCollection.insertOne(newMedical)
    res.setHeader('Access-Control-Allow-Origin', '*');

    const animal = await animalCollection.findOne({_id : newMedical.animalId});
    const pacient = await PacientCollection.findOne({pacientID : animal.userid});
    const newNotification = {
      idPOST: newMedical.animalId,
      idUSER: pacient.medicID,
      ownerId: animal.userid, 
      type: 'add_medical_record',
      isview: false,
      createdAt: new Date()
    };

    await NotificationsCollection.insertOne(newNotification);
    
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err);
  }
});

mainRouter.get('/pacients/:id', async (req, res) => {
  try {
    const medicID = new ObjectId(req.params.id);
    const pacienti = await PacientCollection.find({ medicID: medicID }).toArray();
    res.status(200).send(pacienti);
  } catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
});

// Get all notifications records for a user
mainRouter.get('/notifications/:USERID', async (req, res) => {
  try {
    const userID = new ObjectId(req.params.USERID);
    const notifications = await NotificationsCollection.find({ ownerId: userID }).toArray();
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send(error);
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



//LOGIN

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
    const idUSER = new ObjectId(req.params.userId)
    const user = await userCollection.findOne({_id : idUSER});
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
    console.log(err)
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
    

      if (user && !user.followers.find(follower => follower.toString() === idUserCurent.toString())) {
        await userCollection.updateOne(
          { _id: idUserCurent },
          { $push: { followings: idUser } }
        );
        await userCollection.updateOne(
          { _id: idUser },
          { $push: { followers: idUserCurent } }
        );
        console.log(user);
        console.log(user.followers);
        console.log(user.followers.includes(idUserCurent));
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
mainRouter.put("/unfollow/:id", async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const idUser = new ObjectId(req.params.id);
      const PRIETEN = await userCollection.findOne({ _id: idUser });
      const id = new ObjectId(req.body._id)
      console.log(idUser)
      console.log(id)
      const EU = await userCollection.findOne({ _id: req.body._id });

      const followersArray = PRIETEN.followers.map((follower) => follower.toString());
      console.log(followersArray)

      if (followersArray.includes(req.body._id)) {
        await userCollection.updateOne(
          { _id: id },
          { $pull: { followings: idUser } }
        );
        await userCollection.updateOne(
          { _id: idUser },
          { $pull: { followers: id } }
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
   medicalRecordCollection, animalCollection, ConversationCollection, MessagesCollection,NotificationsCollection,AdvertisingCollection};
