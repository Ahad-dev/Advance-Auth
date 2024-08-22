import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail,sendWelcomeEmail,sendResetPasswordEmail, sendPasswordResetSuccessEmail } from "../mailtrap/email.js";
import { generateVerificationCode,generateTokenAndSetCookie } from "../utils/index.js";
import crypto from "crypto";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try{

        if(!name || !email || !password) {
            throw new Error('Please fill all the fields');    
        }    
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) {
            return res.status(400).json({success:false,message:'User already exists!'});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationCode();

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours

        })

        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        //send verification email
        await sendVerificationEmail(user.email, verificationToken);

        return res.status(201).json({
            success:true,
            message:'User created successfully!',
            user:{
                ...user._doc,
                password:undefined
            }
        });

    }catch(error){
        return res.status(500).json({success:false,message:error.message});
    }


};

export const verifyEmail = async (req,res)=>{
    const {verificationToken} = req.body;
    try{
        const user = await User.findOne({
            verificationToken,
            verificationTokenExpiresAt:{$gt:Date.now()}
        });
        if(!user){
            return res.status(400).json({success:false,message:'Invalid or expired verification token!'});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        //Send welcone email
        await sendWelcomeEmail(user.email,user.name);
        return res.status(200).json({success:true,message:'Email verified successfully!'});
    }catch(error){
        return res.status(500).json({success:false,message:error.message});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success:false,message:'Invalid credentials!'});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success:false,message:'Invalid credentials!'});
        }

        //jwt
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
            success:true,
            message:'Logged in successfully!',
            user:{
                ...user._doc,
                password:undefined
            }
        });

    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success:true,message:'Logged out successfully!'});
}

export const forgotPassword = async (req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:'User not found!'});
        }

        //generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
        
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpires;

        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;       
        console.log(resetUrl);

        //send reset password email
        await sendResetPasswordEmail(user.email,resetUrl);
        
        return res.status(200).json({success:true,message:'Reset password email sent!'});

    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
        
    }
}

export const resetPassword = async (req,res)=>{
    const {password} = req.body;
    const {resetToken} = req.params;
    try {
        const user = await User.findOne({
            resetPasswordToken:resetToken,
            resetPasswordTokenExpiresAt:{$gt:Date.now()}
        });
        if(!user){
            return res.status(400).json({success:false,message:'Invalid or expired reset token!'});
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

        //send password reset email
        await sendPasswordResetSuccessEmail(user.email);

        return res.status(200).json({success:true,message:'Password reset successfully!'});

    } catch (error) {
        res.status(500).json({success:false,message:error.message});        
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) {
            return res.status(400).json({success:false,message:'User not found!'});
        }
        return res.status(200).json({success:true,user});
    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}