import { sendEmail } from "../../../common/email/nodemailer.js";
import * as authRepository from "../repository/auth.repository.js";
import * as otpRepository from "../repository/otp.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import { toMs } from "../../../common/utils/time.js";
import { generateOTPcode } from "../../../common/utils/otp.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import * as authErrors from "../errors.js";
import * as userErrors from "../../user/errors.js";



export async function register(userData) {
    //1. check user exist 
    const userExist = await authRepository.checkUserExistByEmail(userData.email);
    //2. if yes, throw error
    if (userExist) throw userErrors.userAlreadyExist;
    //3. prepare data [hash-password]
    userData.password = await bcrypt.hash(userData.password, 10);
    //4. save user into DB
    const createdUser = await authRepository.createUser(userData);
    //5. generate and save OTP
    const otp = generateOTPcode();
    await otpRepository.createOTP({
        code: otp,
        email: userData.email,
        expireAt: new Date(Date.now() + toMs(10, "minutes"))
    });
    //6. send OTP into mail
    await sendEmail(
        userData.email,
        "OTP Verification",
        `
        <h3>Your Verification Code</h3>
        <h1 style="color: #007bff; letter-spacing: 4px;">${otp}</h1>
        <p>This code is valid for 10 minutes.</p>
        `
    );

    return createdUser;

}

export async function verifyAccount(email, code) {
    //1. check user existence
    const user = await authRepository.checkUserExistByEmail(email);
    //1.1 if not exist >> error "User Not Found"
    if (!user) throw userErrors.userNotExist;
    //1.2 if isVerified = true >> error "Already Verified"
    if (user.isVerified === true) throw userErrors.userAlreadyVerified;
    //2. check OTP validation
    const otp = await otpRepository.getOtpByEmail(email); //{} | null
    //2.1 not exist into DB >> error >> "OTP is Expired" >> resend OTP
    if (!otp) throw authErrors.expiredOTP;
    //2.2 otp stored into DB >> code not equal code stored >> "OTP is Invalid"
    if (otp.code !== code) throw authErrors.invalidOTP;
    //3. Switch your isVerified to true [update user]
    const updatedUser = await userRepository.updateUserByEmail(email, { isVerified: true });
    //4. delete otp from DB
    await otpRepository.deleteOTPByEmail(email);

    return updatedUser;
}

export async function login(email, password) {
    //1. check user exist
    const user = await authRepository.checkUserExistByEmail(email); //{} | null
    //1.1 not exist >> throw error "Invalid Credentials"
    if (!user) throw userErrors.userNotExist;
    //1.2 not verify >> throw error "Please Verify Your Account"
    if (user.isVerified === false) throw userErrors.userNotVerified;
    //2. compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw authErrors.invalidPassword;
    //3. generate token
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: toMs(1, 'hours') });

    return token;


}

export async function sendOtp(email) {
    //1. chech user exist
    const user = await authRepository.checkUserExistByEmail(email);
    if (!user) throw userErrors.userNotExist;
    //2. delete all old OTPs
    await otpRepository.deleteOTPByEmail(email);
    //3. generate new OTP
    const otp = generateOTPcode();
    //4. save OTP in DB
    await otpRepository.createOTP({
        code: otp,
        email: email,
        expireAt: new Date(Date.now() + toMs(10, "minutes"))
    });
    //5. send OTP in mail
    await sendEmail(email,
        'New OTP',
        `
        <h3>Your New OTP Code</h3>
        <h1 style="color: #007bff; letter-spacing: 4px;">${otp}</h1>
        <p>This code is valid for 10 minutes.</p>
        `);

}