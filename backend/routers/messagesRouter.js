const router = require("express").Router();
const { MessagesCollection, ConversationCollection } = require('./mainRouter');
const Message = require("../model/Messages");

//add

router.post("/", async (req, res) => {
  const newMessage = {
    conversationId: req.body.conversationId,
    sender: req.body.sender,
    text: req.body.text,
    createdAt: new Date() 
  };

  try {
    const savedMessage = await MessagesCollection.insertOne(newMessage);

    const insertedMessage = await MessagesCollection.findOne({
      _id: savedMessage.insertedId,
    });

    res.status(200).json(insertedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});



//get

router.get("/:conversationId", async (req, res) => {
  try {

    const messages = await MessagesCollection.find({
      conversationId: req.params.conversationId,
    }).toArray();

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;