import productRepo from "./product.repo";
import { productResponses } from "./product.responses";
import { IProductSchema, IUpdatedFields } from "./product.types";
import inventoryService from "../inventory/inventory.service";
import userService from "../users/user.service";
import mailTemplates from "../utility/mail-templates";
import sendMail from "../utility/mail-service";
import userRepo from "../users/user.repo";
import { Types } from "mongoose";

export const addProduct = async (
    product: IProductSchema,
    manufacturerId: string,
    from: string
) => {
    try {
        product.createdBy = manufacturerId;
        const newProduct = productRepo.insertOne(product);

        if (!newProduct) throw productResponses.CAN_NOT_ADD_PRODUCT;

        await inventoryService.addProductToInventory(newProduct._id.toString());
        const emails = await userService.getUserEmails();

        const mail = mailTemplates.newProduct(
            emails,
            newProduct.productName,
            newProduct.productDescription,
            from
        );
        await sendMail.sendMail(mail);

        return productResponses.PRODUCT_ADDED;
    } catch (e) {
        throw e;
    }
};

export const getAllProduct = async (page?: number, limit?: number) => {
    try {
        page = page || 1;
        limit = limit || 10;
        const products = await productRepo.getAllProduct(page, limit);
        if (!products) throw productResponses.PRODUCTS_NOT_FOUND;
        return products;
    } catch (e) {
        throw e;
    }
};

export const getProductById = async (productId: string) => {
    try {
        const product = await productRepo.getProductById(productId);
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
        const pipline = [
            { $unwind: "$inventory" },
            {
                $match: {
                    "inventory.productId": new Types.ObjectId(productId),
                    "inventory.quantity": { $gt: 0 },
                },
            },
            { $limit: 1 },
        ];
        const productInInventory = await userRepo.aggregate(pipline);
        if (productInInventory.length > 0 || !productInInventory) {
            throw "Product cannot be deleted as it is still in inventory with quantity greater than zero.";
        }
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
    getProductById,
    updateProduct,
    deleteProduct,
};
