import productModel from "./product.schema";
import { IProductSchema, IUpdatedFields } from "./product.types";

export const insertOne = (product: IProductSchema) => {
    const newProduct = new productModel(product);
    newProduct.save();
    return newProduct;
};

export const getAllProduct = async () => {
    const products = await productModel.find();
    return products;
};

export const getSpecificProduct = async (productId: string) => {
    const product = productModel.findById(productId);
    return product;
};
export const updateProduct = async (
    updateFields: Partial<IUpdatedFields>,
    productId: string
) => {
    const isUpdated = await productModel.findByIdAndUpdate(
        productId,
        updateFields
    );
    return isUpdated;
};

export const deleteProduct = async (productId: string) => {
    const isDeleted = await productModel.findByIdAndDelete({ productId });
    return isDeleted;
};

export default {
    insertOne,
    getAllProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
};
