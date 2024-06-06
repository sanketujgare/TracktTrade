import { Types } from "mongoose";
import userModel from "./user.schema";
import { IUserSchema } from "./user.types";

export const findUser = async (query: Partial<IUserSchema>) => {
  const user = await userModel.findOne({
    $or: [{ username: query.username }, { email: query.email }],
  });
  return user;
};

export const insertOne = (newUser: IUserSchema) => {
  const User = new userModel(newUser);
  User.save();
  return User;
};

export default {
  findUser,
  insertOne,
};
