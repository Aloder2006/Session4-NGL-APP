import {OTP} from "../model/otp.model.js";

export async function createOTP(otpData){
    return await OTP.create(otpData)
}

export async function getOtpByEmail(email){
    return await OTP.findOne({email: email});
}

export async function deleteOTPByEmail(email){
    await OTP.deleteMany({email: email});
}