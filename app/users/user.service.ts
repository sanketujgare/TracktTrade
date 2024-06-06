import { authResponses } from "../auth/auth.responses";
import { encrypt } from "../utility/encrypt";
import userRepo from "./user.repo";
import { IUserSchema } from "./user.types";
import { userResponses } from "./user.responses";

export const findUser = async (query: Partial<IUserSchema>) => {
  try {
    const user = await userRepo.findUser(query);
    if (user) return user;
  } catch (e) {
    throw authResponses.INVALID_CREDENTIALS; // change
  }
};

export const checkExisting = async (newUser: IUserSchema) => {
  try {
    const { username, email } = newUser;
    const userExist = await findUser({ username, email });
    if (userExist) {
      if (userExist.username === username)
        throw authResponses.USERNAME_ALREADY_EXIST;
      if (userExist.email === email) throw authResponses.EMAIL_ALREADY_EXIST;
    }
    newUser.password = await encrypt(newUser.password);
    return newUser;
  } catch (e) {
    throw e;
  }
};

export const createUser = async (newUser: IUserSchema) => {
  try {
    const newuser = await checkExisting(newUser);
    const result = await userRepo.insertOne(newuser);
    if (!result) return userResponses.CANNOT_CREATE_USER;
    return userResponses.USER_CREATED_SUCCESSFULLY;
  } catch (e) {
    throw e;
  }
};
export default {
  findUser,
  createUser,
};
