import express from "express";
import "./env.js";
import { connectToDB } from "./src/mongooseConfig/mongoose.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/users/users.routes.js";

import cors from "cors";

const server = express();

// Enable CORS for all requests
server.use(cors());

// receive data from client
server.use(bodyParser.json());

//routes
server.use("/api/users", userRouter);

server.get("/", (req, res, next) => {
  res.status(200).send("Hello welcome to Share Thoughts");
});

server.listen(3000, () => {
  console.log("backend server is runnnig on port 3000");
  connectToDB();
});
