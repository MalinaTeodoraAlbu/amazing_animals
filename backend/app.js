import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { default as mainRouter } from "./routers/mainRouter.js";


const app = express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());


app.use("/api", mainRouter);
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