import { User } from "../../user/model/user.model.js";

export async function checkUserExistByEmail(email) {
  return await User.findOne({ email: email });
}

export async function createUser(userData) {
  return await User.create(userData);
}
