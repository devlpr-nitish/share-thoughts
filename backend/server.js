import express from 'express';






const server = express();

server.get("/", (req,res,next)=>{
    res.status(200).send("Hello welcome to Share Thoughts");
})

server.listen(3000, ()=>{
    console.log("backend server is runnnig on port 3000");
})