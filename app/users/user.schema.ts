import { model, Schema } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { IUserSchema } from "./user.types";

const userSchema = new BaseSchema({
  firstname: String,
  lastname: String,
  fullname: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    default: ["User"],
  },
  profilePic: String,
  empId: {
    type: Number,
  },
  metersAssigned: [
    {
      meterId: {
        type: Schema.Types.ObjectId,
        ref: "Meter",
      },
    },
  ],
  address: {
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
});

const userModel = model<IUserSchema>("User", userSchema);
export default userModel;
