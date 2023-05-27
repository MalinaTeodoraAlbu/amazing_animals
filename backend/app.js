const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {mainRouter} = require("./routers/mainRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const animalRouter = require("./routers/animalRouter");
const conversationsRouter = require("./routers/conversationsRouter");
const messagesRouters = require("./routers/messagesRouter");

const app = express()


app.use(bodyParser.json({ limit: '100000mb' }));
app.use(bodyParser.urlencoded({ limit: '100000mb', extended: true }));
app.use(cors());

app.use("/api", mainRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", animalRouter);
app.use("/api/conversation", conversationsRouter);
app.use("/api/message", messagesRouters);
app.use('/uploads', express.static('uploads'));

app.listen(7070, async () => {
    console.log("Express port 7070")
  try {
    console.warn('Connected')
  } catch (error) {
    console.warn('Unable to connect to db')
    console.warn(error)
  }
})