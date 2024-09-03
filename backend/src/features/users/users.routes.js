import express from 'express'
import UserController from './users.controller.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", (req, res, next) => {
    userController.signup(req, res, next);
})


export default userRouter;