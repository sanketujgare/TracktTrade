import { IUserResponses, IUserSchema } from "../users/user.types";

export interface IAuthResponses extends IUserResponses {}
export interface CredentialsI
extends Pick<IUserSchema, "username" | "password"> {}
