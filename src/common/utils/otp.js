import crypto from "crypto";

export function generateOTPcode(){
    return crypto.randomInt(100000,999999).toString();
}