import productModel from "./product.schema";
import { IProductSchema, IUpdatedFields } from "./product.types";

export const insertOne = (product: IProductSchema) => {
    const newProduct = new productModel(product);
    newProduct.save();
    return newProduct;
};

export const getAllProduct = async (page: number, limit: number) => {
    const products = await productModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
    return products;
};

export const getProductById = async (productId: string) => {
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
    const isDeleted = await productModel.findByIdAndDelete({ _id: productId });
    return isDeleted;
};

export default {
    insertOne,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
