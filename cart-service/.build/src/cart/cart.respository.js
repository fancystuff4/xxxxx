"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const client_1 = require("../db/client");
class CartRepository {
    constructor() { }
    async insertIntoCart(cartDto, sessionUserId) {
        const cartItem = cartDto;
        const date = new Date();
        const totalPrice = cartDto.quantity * cartDto.variant.price;
        cartDto['totalPrice'] = totalPrice;
        const newCart = {
            id: (0, uuid_1.v4)(),
            userID: sessionUserId,
            createdAt: date.toString(),
            updatedAt: date.toString(),
            items: [
                {
                    lineItemID: (0, uuid_1.v4)(),
                    itemDetails: cartItem
                }
            ]
        };
        try {
            await client_1.default
                .put({
                TableName: 'CartTable-dev',
                Item: newCart,
            })
                .promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return { ok: true, data: newCart };
    }
    async insertIntoCartItems(cartDto, cartID) {
        const totalPrice = cartDto.quantity * cartDto.variant.price;
        cartDto['totalPrice'] = totalPrice;
        const lineItem = {
            lineItemID: (0, uuid_1.v4)(),
            itemDetails: cartDto
        };
        const updatedDate = new Date();
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: cartID },
            UpdateExpression: 'SET #items = list_append(#items, :item), updatedAt = :now',
            ExpressionAttributeValues: {
                ':item': [lineItem],
                ':now': updatedDate.toString()
            },
            ExpressionAttributeNames: {
                '#items': 'items'
            }
        };
        try {
            await client_1.default.update(params).promise();
            return { ok: true, data: cartDto };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateItemInCart(cartDto, cartID, userCartItems) {
        let index;
        let itemToBeModified = userCartItems.find((item, i) => {
            index = i;
            return item.itemDetails.variant.variantID === cartDto.variant.variantID;
        });
        itemToBeModified.itemDetails.quantity += cartDto.quantity;
        itemToBeModified.itemDetails.totalPrice = itemToBeModified.itemDetails.quantity * cartDto.variant.price;
        let updatedDate = new Date();
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: cartID },
            UpdateExpression: `SET #items[${index}] = :updatedItem, updatedAt = :now`,
            ExpressionAttributeValues: {
                ':updatedItem': itemToBeModified,
                ':now': updatedDate.toString()
            },
            ExpressionAttributeNames: {
                '#items': 'items'
            }
        };
        try {
            await client_1.default.update(params).promise();
            return { ok: true, data: itemToBeModified };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async modifyItemInUserCart(cartID, cartItems, lineItemID, quantity) {
        let index;
        let itemToBeModified = null;
        for (var i in cartItems) {
            if (cartItems[i].lineItemID === lineItemID) {
                index = parseInt(i);
                itemToBeModified = cartItems[i];
                break;
            }
        }
        if (itemToBeModified === null) {
            return { ok: false };
        }
        itemToBeModified.itemDetails.quantity = quantity;
        itemToBeModified.itemDetails.totalPrice = itemToBeModified.itemDetails.variant.price * quantity;
        const updatedDate = new Date();
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: cartID },
            UpdateExpression: `SET #items[${index}] = :updatedItem, updatedAt = :now`,
            ExpressionAttributeValues: {
                ':updatedItem': itemToBeModified,
                ':now': updatedDate.toString()
            },
            ExpressionAttributeNames: {
                '#items': 'items'
            }
        };
        try {
            await client_1.default.update(params).promise();
            return { ok: true, data: itemToBeModified };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findUserCart(sessionUserId) {
        const params = {
            TableName: 'CartTable-dev',
            IndexName: 'userID-index',
            KeyConditionExpression: '#userID = :userID',
            ExpressionAttributeValues: {
                ':userID': sessionUserId
            },
            ExpressionAttributeNames: {
                '#userID': 'userID'
            }
        };
        try {
            const result = await client_1.default.query(params).promise();
            return result.Items[0];
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    findItemInCart(cartItems, variantIdToBeSearched) {
        for (var i in cartItems) {
            if (cartItems[i].itemDetails.variant.variantID === variantIdToBeSearched)
                return true;
        }
        return false;
    }
    async findAnonymousCart(anonymousCartId) {
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: anonymousCartId }
        };
        try {
            const result = await client_1.default.get(params).promise();
            return result.Item;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async removeItemFromUserCart(cartID, cartItems, lineItemID) {
        let index = null;
        for (var i in cartItems) {
            if (cartItems[i].lineItemID === lineItemID) {
                index = parseInt(i);
            }
        }
        if (index === null) {
            return { ok: false };
        }
        const updatedDate = new Date();
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: cartID },
            UpdateExpression: `REMOVE #items[${index}] SET updatedAt = :now`,
            ExpressionAttributeValues: {
                ':now': updatedDate.toString()
            },
            ExpressionAttributeNames: {
                '#items': 'items'
            }
        };
        try {
            await client_1.default.update(params).promise();
            return { ok: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async deleteCart(cartID) {
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: cartID }
        };
        try {
            await client_1.default.delete(params).promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
}
exports.CartRepository = CartRepository;
//# sourceMappingURL=cart.respository.js.map