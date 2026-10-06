import 'dotenv/config';;

import "./common/db/mongoose.js";
import express from "express";
import authRouter from "./app/auth/auth.route.js";
import userRouter from "./app/user/user.route.js";
import messageRouter from "./app/message/message.route.js";
import { logger } from './common/logger/logger.js';

const app = express();

app.use(express.json());

// Router for features
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);

// global error handler
app.use((err, req, res, next) => {

    logger.error(err.message, err);

    if(err.isOperational === true){
        return res.status(err.statusCode).json({
            error: err.message,
            success: false
        });
    }
    return res.status(500).json({
        error: "Something went wrong",
        success: false
    });
});

app.listen(3000, () => {
    logger.info("Server is running on port 3000");
});
