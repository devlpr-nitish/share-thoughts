import bcrypt from 'bcrypt';
import { UserModel } from './users.schema.js';
import UserRepository from './users.repository.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { subscribeModel } from './subcribe.schema.js';

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(req, res, next) {

        try {
            const { name, email, password } = req.body;

            // hash passeword
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                name: name,
                email: email,
                password: hashedPassword
            })

            const signupedUser = await this.userRepository.signup(newUser);
            return res.status(200).send(signupedUser);

        } catch (error) {

            console.log(error);
            return res.status(400).send("something went wrong");
        }
    }
    async signin(req, res, next) {

        try {
            const { email, password } = req.body;

            const userExists = await this.userRepository.findByEmail(email);
            if (!userExists) {
                return res.status(400).send("Incorrect Credentials");
            } else {

                // match password
                const match = await bcrypt.compare(password, userExists.password);
                if (!match) {
                    return res.status(400).send("Incorrect Credentials");
                } else {
                    const jwtToken = await jwt.sign({ email: userExists.email, userID: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    return res.status(200).send(jwtToken);
                }
            }

        } catch (error) {
            console.log(error);
            return res.status(400).send("something went wrong");
        }
    }
    async subscribe(req, res, next) {

        try {

            const { user } = req.query;
            
            const userID = req.userID;

            let subs = false;
            const subscribed = await this.userRepository.subscribe(userID, user, subs);
            if (subscribed) {
                return res.status(200).send("subscribed successfully");
            } else {
                return res.status(200).send("unsubscribed successfully");
            }

        } catch (error) {
            console.log(error);
            return res.status(400).send("something went wrong");
        }
    }
}