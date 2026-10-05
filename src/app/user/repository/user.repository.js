import { User } from "../model/user.model.js";

export async function updateUserByEmail(email, updatedData){
    return await User.findOneAndUpdate(
        {email: email}, // filter
        updatedData, // updated data
        {returnDocument: "after"} // options
    )
}
    