import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js';

export const signup = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ error : "Invalid email Format"})
        }
        
        const existingEmail = await User.findOne({email : email})
        const existingUsername = await User.findOne({username})

        if(existingEmail || existingUsername){
            return res.status(400).json({error : "Already Existing User or Email "})
        }

        if(!password || password.length < 8) {
            return res.status(400).json({error : "Password must have atleast 8 char length"})
        }

        //hashing the password

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            username,
            email,
            password : hashPassword
        })

        const savedUser = await newUser.save();
 
        if(savedUser){
            const token = generateToken(savedUser._id, res)
            res.status(200).json({
                user: savedUser,
                token: token,
        })
        }
        else{
            res.status(400).json({error : "Invalid User Data"})
        }  


    } catch (error) {
        console.log(`Error in signup controller : ${error}`)
        res.status(500).json({error : "Internal Server Error"})
        
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!email || !isPasswordCorrect) {
            return res.status(400).json({error: "user id or password is incorrect"})
        }

        const token = generateToken(user._id, res);  

        res.status(200).json({ 
            user: {_id : user._id,   
                username : user.username,
                email : user.email,},
            token,
        })
    } catch (error) {
        console.log(`Error in login controller : ${error}`)
        res.status(500).json({error : "Internal Server Error"})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge : 0});
        res.status(200).json({message : "Logout successfully"});
        
    } catch (error) {
        console.log(`Error in logout controller : ${error}`)
        res.status(500).json({error : "Invalid Server Error"});
    }
}

export const getMe = async (req, res)=>{
    try {
        const user = await User.findOne({_id : req.user._id}).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in getMe controller : ${error}`)
        res.status(500).json({error : "Invalid Server Error"});
    }
}