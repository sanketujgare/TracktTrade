import { productResponses } from "../Products/product.responses";
import productService from "../Products/product.service";
import { userResponses } from "../users/user.responses";
import userService from "../users/user.service";
import { IUserSchema } from "../users/user.types";
import { inventoryResponses } from "./inventory.responces";
import { IInventorySchema } from "./inventory.types";

export const addProductToInventory = async (productId: string) => {
    try {
        await userService.addProductToInventory({
            productId: productId,
            quantity: 0,
        });

        // notification logic will go here
    } catch (e) {
        throw e;
    }
};

export const getInventory = async (userId: string) => {
    try {
        const userInventory = await userService.getInventory(userId);
        if (!userInventory) return inventoryResponses.NO_DATA_FOUND;
        if (!userInventory.inventory) return inventoryResponses.EMPTY_INVENTORY;
        const inventory = userInventory.inventory.map((product) => {
            const { productId, quantity } = product;
            return { product: productId, quantity };
        });
        return inventory;
    } catch (e) {
        throw e;
    }
};

export const checkInventoryLevel = async (
    user: IUserSchema,
    products: IInventorySchema[]
) => {
    try {
        if (!user.inventory || user.inventory.length === 0)
            return inventoryResponses.EMPTY_INVENTORY;

        for (const product of products) {
            const inventoryItem = user.inventory.find(
                (item) =>
                    item.productId.toString() === product.productId.toString()
            );

            if (
                !inventoryItem ||
                inventoryItem.quantity < product.quantity ||
                inventoryItem.quantity <= 10
            ) {
                const theProduct = await productService.getSpecificProduct(
                    product.productId
                );

                if (theProduct) {
                    throw `Insufficient quantity for product ${theProduct.productName}`;
                }
            }
        }
    } catch (e) {
        throw e;
    }
};

export const updateManufacturersInventory = async (
    userId: string,
    product: IInventorySchema
) => {
    try {
        const user = await userService.getSpecificUser(userId);
        await productService.getSpecificProduct(product.productId);

        if (user.inventory) {
            const inventoryItem = user.inventory.find(
                (item) =>
                    item.productId.toString() === product.productId.toString()
            );
            if (inventoryItem) inventoryItem.quantity += product.quantity;
        } else {
            throw inventoryResponses.EMPTY_INVENTORY;
        }
        await user.save();
    } catch (e) {
        throw e;
    }
};

export const updateInventory = async (
    userId: string,
    products: IInventorySchema[]
) => {
    try {
        const user = await userService.getSpecificUser(userId);

        products.forEach((product) => {
            if (user.inventory) {
                const inventoryItem = user.inventory.find(
                    (item) =>
                        item.productId.toString() ===
                        product.productId.toString()
                );

                if (inventoryItem) {
                    inventoryItem.quantity += product.quantity;
                }
            }
        });

        await user.save();
        return userResponses.INVENTORY_UPDATED;
    } catch (e) {
        throw e;
    }
};
export default {
    addProductToInventory,
    updateInventory,
    checkInventoryLevel,
    updateManufacturersInventory,
    getInventory,
};
