import { model } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { IProductSchema } from "./product.types";

const productSchema = new BaseSchema({
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
    },
    productImage: {
        type: String,
    },
});

const productModel = model<IProductSchema>("Product", productSchema);
export default productModel;
