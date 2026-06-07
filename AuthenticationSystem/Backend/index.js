import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pool from "./db.js"
const app = express();

app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.status(200).json("HI i am the default route...");
})
app.post('/login', async (req,res)=>{
    const {email , password} = req.body;
    console.log(req.body);
    const user= await pool.query(`select * from registrationsDetails where email = '${email}'`)
    const passwordHash = user[0][0].passwordHash;
    const isPasswordCorrect = await bcrypt.compare(password,passwordHash);
    if(isPasswordCorrect){
        res.status(200).json({message:true});
    }else{
        res.status(401).json({message:false});
    }
    console.log(isPasswordCorrect);
    console.log(user[0][0]);
})

app.post('/register', async (req,res)=>{
    const {name , email , password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await pool.query(`insert into registrationsDetails(name,email,passwordHash) values('${name}','${email}','${hashedPassword}')`)
    console.log(newUser); 
    res.status(200).json({message:"New User Registered succesfully!"})
    
})

app.listen(3000,()=>{
    console.log("Server is Started on 3000...");
})
