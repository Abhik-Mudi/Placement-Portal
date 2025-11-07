import bcrypt from "bcrypt"

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const signup=async (req, res)=>{
    try{
        const {username, email, password}=req.body;

        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user= await User.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result) => {
                if(result){
                    generateToken(user._id, res);
                    return res.status(201).json({username: user.username, email: user.email})
                }
                else return res.status(400).json({message: "Invalid credentials"});
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res);
            return res.status(201).json({username: newUser.username, email: newUser.email});
        }

        return res.status(400).json({message: "User creation failed"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login =async (req, res)=>{
    try {
        const {username, password} =req.body;

        if(!username || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({error: "Invalid credentials"})
        }
        
        bcrypt.compare(password, user.password, async function (err, result){
            if(result){
                generateToken(user._id, res);
                return res.status(200).json({
                    username: user.username,
                    email: user.email,
                }); 
            }
            else{
                return res.status(400).json({error: "Invalid credentials"});               
            }
        })
        
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = (req, res)=>{
    try {
        res.cookie("placement", "", {maxAge: 0});
        return res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"})  
    }
}

