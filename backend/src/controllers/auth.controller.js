import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '../utils/token.js'

export const refreshAccessToken = async (req,res) => {
    const { refreshToken } = req.body
    if(!refreshToken){
        return res.status(401).json({ success : false ,message : "Refresh token required"})
    }
    try{
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decoded.id)
        if(!user || user.refreshToken !== refreshToken){
            return res.status(403).json({ success : false ,message : "Invalid refresh token"})
        }
        const newAccessToken = generateAccessToken(user._id)
        return res.status(200).json({ success: true,accessToken:newAccessToken});
    }catch(error){
        return res.status(403).json({ success : false ,message : "Invalid or expired refresh token"})
    }
}

export const registerUser = async (req,res) => {
    try{
        const { name ,email,password} = req.body
        const existingUser = await User.findOne({email})

        if(existingUser)
            return res.status(400).json({ success : false ,message : "User already created"})

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashedPassword})

        return res.status(201).json({ success : true ,message : "User created successfully!", userId : user._id})
    } catch(error){
        return res.status(400).json({ success : false ,message : "Unable to register"})
    }
}

export const loginUser = async (req,res) => {
    try{
        const { email,password} = req.body
        const user = await User.findOne({email})
        if(!user)
            return res.status(401).json({ success: false,message: "Invalid email or password",});

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(401).json({ success : false ,message : "Unauthorized"})
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken
        await user.save()

        return res.status(200).json({ success : true ,
            message : "User loggedin Successfully",
            accessToken : accessToken
        })

    } catch(error){
        return res.status(404).json({ success : false ,message : "User not found"})
    }
}