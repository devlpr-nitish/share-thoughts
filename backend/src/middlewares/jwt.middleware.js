import jwt from 'jsonwebtoken';

const jwtAuth = async(req,res,next)=>{

    try {
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).send("Unauthorized user");
        }

        const payload = await jwt.verify(token, process.env.JWT_SECRET);

        req.userID = payload.userID;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized user");
    }
}
export default jwtAuth;