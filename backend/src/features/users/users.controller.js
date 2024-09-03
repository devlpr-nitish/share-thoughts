import bcrypt from 'bcrypt';
import { UserModel } from './users.schema.js';
import UserRepository from './users.repository.js';


export default class UserController {

    constructor(){
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
            return res.status(200).send("something went wrong");
        }
    }
}