import userService from "../users/user.service";
import { authResponses } from "./auth.responses";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CredentialsI } from "./auth.types";
import { userResponses } from "../users/user.responses";
export const login = async (credentials: CredentialsI) => {
  try {
    const user = await userService.findUser({ username: credentials.username });

    if (!user) {
      throw userResponses.INVALID_CREDENTIALS;
    }

    const didMatch = await bcrypt.compare(credentials.password, user.password);
    if (!didMatch) {
      throw userResponses.INVALID_CREDENTIALS;
    }
    const role = user.role;
    const { password, ...restOfTheUser } = user.toObject();
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(restOfTheUser, JWT_SECRET || "");

    return { token, role };
  } catch (e) {
    throw authResponses.INVALID_CREDENTIALS;
  }
};

export const logout = (token: string) => {
  try {
    // what is this API doing?
    const { MANIPULATE_TOKEN } = process.env;
    token = token + MANIPULATE_TOKEN;
    return token;
  } catch (e) {
    throw e;
  }
};
export default {
  login,
  logout,
};
