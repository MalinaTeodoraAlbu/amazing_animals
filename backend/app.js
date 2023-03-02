import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { default as mainRouter } from "./routers/mainRouter.js";

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", mainRouter);



app.listen(7070, async () => {
    console.log("Express port 7070")
  try {
    console.warn('Connected')
  } catch (error) {
    console.warn('Unable to connect to db')
    console.warn(error)
  }
})