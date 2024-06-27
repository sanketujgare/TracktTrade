import productService from "../Products/product.service";
import { userResponses } from "../users/user.responses";
import userService from "../users/user.service";
import { IUserSchema } from "../users/user.types";
import { inventoryResponses } from "./inventory.responces";
import { IInventorySchema } from "./inventory.types";

export const getDefaultInventory = async (): Promise<IInventorySchema[]> => {
    try {
        const products = await productService.getAllProduct();
        // aggregation ni hou shakta
        const inventory = products.map((product) => {
            return {
                productId: product._id.toString(),
                quantity: 0,
            };
        });
        return inventory;
    } catch (e) {
        throw e;
    }
};
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
        if (!userInventory) throw inventoryResponses.NO_DATA_FOUND;

        // if inventory is empty array - this check will fail
        if (!userInventory.inventory) throw inventoryResponses.EMPTY_INVENTORY;

        // aggregation
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
            throw inventoryResponses.EMPTY_INVENTORY;

        for (const product of products) {
            // n^2
            const inventoryItem = user.inventory.find(
                (item) =>
                    item.productId.toString() === product.productId.toString()
            );

            if (
                !inventoryItem ||
                inventoryItem.quantity < product.quantity // ||
                // inventoryItem.quantity <= 10
            ) {
                const theProduct = await productService.getProductById(
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
        const user = await userService.getUserById(userId);
        await productService.getProductById(product.productId);

        let inventory = user.inventory;
        if (inventory) {
            const inventoryItem = inventory.find(
                (item) =>
                    item.productId.toString() === product.productId.toString()
            );
            if (inventoryItem) inventoryItem.quantity += product.quantity;
        } else {
            throw inventoryResponses.EMPTY_INVENTORY;
        }

        if (inventory) {
            await userService.updateInventory(inventory, user._id.toString());
            return inventoryResponses.INVENTORY_UPDATED;
        }
    } catch (e) {
        throw e;
    }
};

export const updateInventory = async (
    userId: string,
    products: IInventorySchema[]
) => {
    try {
        const user = await userService.getUserById(userId);
        let inventory = user.inventory;
        products.forEach((product) => {
            if (inventory) {
                const inventoryItem = inventory.find(
                    (item) =>
                        item.productId.toString() ===
                        product.productId.toString()
                );
                if (inventoryItem) {
                    inventoryItem.quantity += product.quantity;
                }
            }
        });
        if (inventory) {
            await userService.updateInventory(inventory, user._id.toString());
            return userResponses.INVENTORY_UPDATED;
        }
    } catch (e) {
        throw e;
    }
};

export default {
    getDefaultInventory,
    addProductToInventory,
    updateInventory,
    checkInventoryLevel,
    updateManufacturersInventory,
    getInventory,
};
