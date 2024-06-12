import productRepo from "./product.repo";
import { productResponses } from "./product.responses";
import { IProductSchema, IUpdatedFields } from "./product.types";
import inventoyService from "../inventory/inventoy.service";

export const addProduct = async (
    product: IProductSchema,
    manufacturerId: string
) => {
    try {
        product.createdBy = manufacturerId;
        const newProduct = productRepo.insertOne(product);

        if (!newProduct) throw productResponses.CAN_NOT_ADD_PRODUCT;
        await inventoyService.addProductToInventory(newProduct._id.toString());
        return productResponses.PRODUCT_ADDED;
    } catch (e) {
        throw e;
    }
};

export const getAllProduct = async () => {
    try {
        const products = await productRepo.getAllProduct();
        if (!products) throw productResponses.PRODUCTS_NOT_FOUND;
        return products;
    } catch (e) {
        throw e;
    }
};

export const getSpecificProduct = async (productId: string) => {
    try {
        const product = await productRepo.getSpecificProduct(productId);
        if (!product) throw productResponses.PRODUCTS_NOT_FOUND;
        return product;
    } catch (e) {
        throw e;
    }
};

export const updateProduct = async (
    updatedFields: Partial<IUpdatedFields>,
    productId: string,
    userId: string
) => {
    try {
        updatedFields.updatedBy = userId;
        const isUpdated = await productRepo.updateProduct(
            updatedFields,
            productId
        );
        if (!isUpdated) throw productResponses.CANNOT_UPDATE_PRODUCT;
        return productResponses.PRODUCT_UPDATED;
    } catch (e) {
        throw e;
    }
};
export const deleteProduct = async (productId: string) => {
    try {
        const isDeleted = await productRepo.deleteProduct(productId);
        if (!isDeleted) throw productResponses.CAN_NOT_DELETE_PRODUCT;
        return productResponses.PRODUCT_DELETED_SUCCESSFULLY;
    } catch (e) {
        throw e;
    }
};

export default {
    addProduct,
    getAllProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
};
