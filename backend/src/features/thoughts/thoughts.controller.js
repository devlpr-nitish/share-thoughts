import ThoughtRepository from "./thoughts.repository.js";
import { thoughtModel } from "./toughts.schema.js";


export default class ThoughtsController {

    constructor() {
        this.thoughtRepository = new ThoughtRepository();
    }


    async addThought(req, res, next) {
        try {
            const { title, content } = req.body;

            // userID comming from jwt token
            const userID = req.userID;

            const newThought = new thoughtModel({
                title: title,
                content: content,
                user: userID
            });

            const addedThought = await this.thoughtRepository.add(newThought);
            return res.status(201).send(addedThought);
        } catch (error) {
            console.log(error);
            return res.status(400).send("something went wrong");
        }


    }

    async getthoughts(req, res, next) {
        try {
            const userID = req.userID;
            const allThoughts = await this.thoughtRepository.get(userID);
            return res.status(200).send(allThoughts);
        } catch (error) {
            console.log(error);
            return res.status(400).send("something went wrong");
        }
    }

    async likeThought(req, res, next) {
        try {
            const userID = req.userID;
            const { thoughtID } = req.query;
            let like = false;
            const liked = await this.thoughtRepository.like(userID, thoughtID, like);
            if (liked) { 
                return res.status(200).send("Thought liked successfully");
            } else {
                return res.status(200).send("Thought disliked successfully");
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send("something went wrong");
        }
    }
}