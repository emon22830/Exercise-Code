import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async(req,res)=>{
    try {
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid"
            });
        }

        if(password.length<6){
            return res.status(400).json({
                    success:false,
                    message:"Password must be at least 6 characters"
            } )
        }

        const existingUserByEmail = await User.findOne({email:email})
        if(existingUserByEmail){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        
        return  res.status(201).json({
            success:true,
            message:"Account created Successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Failed to register"
        })
        
    }
}

export const login = async(req,res)=>{
    try {
           const {email, password} = req.body;
           if(!email || !password){
              return res.status(500).json({
                success:false,
                message: "All fields are required"
              })
           }
           let user = await User.findOne({email})
           if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
           }
           const isPasswordValid = await bcrypt.compare(password, user.password)
           if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message: "Invalid Credentials"
            })
           }

           const token = await JsonWebTokenError.sign({userID:user._id}, process.env.SECRET_KEY, {EXPIRESiN: "1d"})
           return res.status(200).cookie("token", token, {maxAge:1*2460*60*1000, httpsOnly:true, sameSite:"strict"}).json({
            success:true,
            message: `Welcome back ${user.firstName}`,
            user
           })

         

    } catch (error) {  
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Failed to login"
        })
    }
}

export const logout = async(__dirname, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logout successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}