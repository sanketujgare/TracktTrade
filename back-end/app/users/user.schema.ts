import { model, Schema, Types } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { IUserSchema } from "./user.types";

const userSchema = new BaseSchema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Manufacturer", "Distributor", "Customer"],
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
  },
  inventory: [
    {
      productId: {
        type: Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  distributorSales: [
    {
      salesId: {
        type: Types.ObjectId,
        ref: "Sales",
      },
    },
  ],
  customerPurchaceHistory: [
    {
      salesId: {
        type: Types.ObjectId,
        ref: "Sales",
      },
    },
  ],
  rewardsRedeemed: [
    {
      rewardId: {
        type: Types.ObjectId,
        ref: "Reward",
      },
    },
  ],
});

const userModel = model<IUserSchema>("User", userSchema);
export default userModel;
