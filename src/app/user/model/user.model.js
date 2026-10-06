import { model, Schema } from "mongoose";

// schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: function () {
                return this.provider === "local";
            },
        },
        provider: {
            type: String,
            enum: ["google", "facebook", "local"],
            default: "local",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        birthDate: Date,
        gender: {
            type: String,
            enum: ["male", "female"],
            default: "male",
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        strict: true
    },
);
// model

export const User = model("User", userSchema);
