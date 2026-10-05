import * as authService from "../service/auth.service.js"
import { toMs } from "../../../common/utils/time.js";


export async function register(req,res, next){
    try{
        const createdUser = await authService.register(req.body);
        res.status(201).json({
            message:"User registered successfully",
            status:"success",
           data:createdUser
        });

    }catch(error){
        next(error);
    }
}
    
export async function verifyAccount(req, res, next){
    try{
        const {email, code} = req.body;
        const updatedUser = await authService.verifyAccount(email, code);
        res.status(200).json({
            message:"User verified successfully",
            status:"success",
           data:updatedUser
        });

    }catch(error){
        next(error)
    }
}

export async function login(req, res, next) {
    try{
        const {email, password } = req.body;
        const token = await authService.login(email, password);
        res.cookie("access_token",token,{
            httpOnly: true,
            maxAge: toMs(1, "hours"),
        });
        res.status(200).json({
            message:"User logged in successfully",
            success: true
        })
    }catch(error){
        next(error);
    }
    
}

export async function sendOtp(req,res, next){
    try{
        const {email } = req.body;
        await authService.sendOtp(email);
        res.status(200).json({
            message: "OTP sent successfully",
            status: "success"
        })
    }catch(error){
        next(error)
    }
}