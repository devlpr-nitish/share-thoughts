import "./env.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectToDB } from "./src/mongooseConfig/mongoose.js";
import userRouter from "./src/features/users/users.routes.js";
import thoughtRouter from "./src/features/thoughts/thoughts.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

const server = express();

// Enable CORS for all requests
server.use(cors());

// receive data from client
server.use(bodyParser.json());

//users route
server.use("/api/users", userRouter);
//thought route
server.use("/api/thoughts", jwtAuth, thoughtRouter);




server.get("/", (req, res, next) => {
  res.status(200).send("Hello welcome to Share Thoughts");
});

server.listen(3000, () => {
  console.log("backend server is runnnig on port 3000");
  connectToDB();
});
