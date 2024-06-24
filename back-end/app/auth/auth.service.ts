import userService from "../users/user.service";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ICredentials } from "./auth.types";
import { userResponses } from "../users/user.responses";
import { authResponses } from "./auth.responses";

export const login = async (credentials: ICredentials) => {
    try {
        const user = await userService.findUser({
            username: credentials.username,
        });
        if (!user) {
            throw authResponses.INVALID_CREDENTIALS;
        }

        const didMatch = await compare(credentials.password, user.password);
        if (!didMatch) {
            throw authResponses.INVALID_CREDENTIALS;
        }
        const role = user.role;
        const userId = user._id;
        const { password, ...restOfTheUser } = user.toObject();
        const { JWT_SECRET } = process.env;
        const token = jwt.sign(restOfTheUser, JWT_SECRET || "");
        return { token, role, userId };
    } catch (e) {
        throw e;
    }
};

export const logout = (token: string) => {
    try {
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
