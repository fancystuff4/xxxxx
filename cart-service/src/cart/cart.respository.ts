import { CartDto } from './dto/createCart.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import client from '../db/client';
import { type } from 'os';

export class CartRepository {
    constructor() {}

    async insertIntoCart(cartDto: CartDto, sessionUserId: string) {
        const cartItem = cartDto;
        const date = new Date();
        const totalPrice = cartDto.quantity * cartDto.variant.price;
        cartDto['totalPrice'] = totalPrice;
        const newCart = {
            id: uuid(),
            userID: sessionUserId,
            createdAt: date.toString(),
            updatedAt: date.toString(),
            items: [
                {
                    lineItemID: uuid(),
                    itemDetails: cartItem
                }
            ]
        };
        try {
            await client
                .put({
                    TableName: 'CartTable-dev',
                    Item: newCart,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return { ok: true, data: newCart};
    }

    async insertIntoCartItems(cartDto: CartDto, cartID: string) {
        const totalPrice = cartDto.quantity * cartDto.variant.price;
        cartDto['totalPrice'] = totalPrice;
        const lineItem = {
            lineItemID: uuid(),
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
        }
        try {
            await client.update(params).promise();
            return { ok: true, data: lineItem };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateItemInCart(cartDto: CartDto, cartID: string, userCartItems: any[]) {
        let index: number;
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
        }
        try {
            await client.update(params).promise();
            return { ok: true, data: itemToBeModified };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async modifyItemInUserCart(cartID: string, cartItems: any[], lineItemID: string, quantity: number) {
        let index: number;
        let itemToBeModified: any = null;
        for(var i in cartItems) {
            if(cartItems[i].lineItemID === lineItemID){
                index = parseInt(i);
                itemToBeModified = cartItems[i];
                break;
            }
        }
        if(itemToBeModified === null){
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
        }
        try {
            await client.update(params).promise();
            return { ok: true, data: itemToBeModified };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findUserCart(sessionUserId: string) {
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
            const result = await client.query(params).promise();
            return result.Items[0];
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    findItemInCart(cartItems: any[], variantIdToBeSearched: string) {
        for(var i in cartItems) {
            if(cartItems[i].itemDetails.variant.variantID === variantIdToBeSearched)
                return true;
        }
        return false;
    }

    async findAnonymousCart(anonymousCartId: string) {
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: anonymousCartId }
        };
        try {
            const result = await client.get(params).promise();
            return result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async removeItemFromUserCart(cartID: string, cartItems: any[], lineItemID: string) {
        let index: number = null;
        let itemToBeRemoved: any;
        for(var i in cartItems) {
            if(cartItems[i].lineItemID === lineItemID){
                index = parseInt(i);
                itemToBeRemoved = cartItems[i];
            }
        }
        if(index === null){
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
        }
        try {
            await client.update(params).promise();
            return { ok: true, data: itemToBeRemoved };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteCart(cartID: string) {
        const params = {
            TableName: 'CartTable-dev',
            Key: { id: cartID }
        };
        try {
            await client.delete(params).promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}