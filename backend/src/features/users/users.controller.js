import bcrypt from 'bcrypt';
import { UserModel } from './users.schema.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { subscribeModel } from './subcribe.schema.js';
import UserRepository from './users.repository.js';

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(req, res, next) {

        try {
            const { name, email, password } = req.body;
            const userExists = await UserModel.findOne({ email });
            if(userExists) {
                return res.status(400).json({
                    message: "user already exists",
                    success: false
                });
            }
            // hash passeword
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                name: name,
                email: email,
                password: hashedPassword
            })

            const signupedUser = await newUser.save();
            return res.status(201).json({
                message: "user signed up successfully",
                success: true,
                data: signupedUser
            });

        } catch (error) {

            console.log(error);
                return res.status(400).json ({
                message: "something went wrong",
                success: false
            });
        }
    }
    async signin(req, res, next) {

        try {
            const { email, password } = req.body;

            const userExists = await UserModel.findOne({ email });
            if (!userExists) {
                return res.status(400).json({
                    message: "User does not exist",
                    success: false
                });
            } else {

                // match password
                const match = await bcrypt.compare(password, userExists.password);
                if (!match) {
                    return res.status(400).json({
                        message: "Incorrect Credentials",
                        success: false
                    });
                } else {
                    const jwtToken = await jwt.sign({ email: userExists.email, userID: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    return res.status(200).json({
                        message: "user signed in successfully",
                        success: true,
                        token: jwtToken
                    });
                }
            }

        } catch (error) {
            return res.status(400).json({
                message: "something went wrong",
                success: false
            });
        }
    }
    async subscribe(req, res, next) {

        try {

            const { user } = req.query;
            
            const userID = req.userID;

            let subs = false;
            const subscribed = await this.userRepository.subscribe(userID, user, subs);
            if (subscribed) {
                return res.status(200).json({
                    message: "subscribed successfully",
                    success: true
                });
            } else {
                return res.status(200).json({
                    message: "unsubscribed successfully",
                    success: true
                });
            }

        } catch (error) {
            return res.status(400).json({
                message: "something went wrong",
                success: false
            });
        }
    }
}