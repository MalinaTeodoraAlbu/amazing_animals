const router = require("express").Router();
const Conversation = require("../model/Conversations");
const { ConversationCollection} = require('./mainRouter');
//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  console.log(newConversation)

  try {
    const savedConversation = await ConversationCollection.insertOne(newConversation)

    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await ConversationCollection.find({
      members: { $in: [req.params.userId] },
    }).toArray()
    
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await ConversationCollection.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;