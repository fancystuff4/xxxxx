
   
import { CreateOrderDto } from './dto/createOrder.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import client from '../db/client';

export class OrderRepository {
    constructor() {}

    async createOrder(createOrderDto: CreateOrderDto) {
        const newOrder = {
            id: uuid(),
            title: createOrderDto.title,
            category: createOrderDto.category,
        };

        try {
            console.log("TableName","OrdersTable");
            await client
                .put({
                    TableName: 'OrdersTable-dev',
                    Item: newOrder,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: newOrder };
    }

    async getOrderById(id) {
        let order;
        try {
            const result = await client
                .get({
                    TableName: 'OrdersTable-dev',
                    Key: { id },
                })
                .promise();

            order = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with ID "${id}" not found`);
        }

        return { ok: true, data: order };
    }

    async getOrders() {
        let orders;
        try {
            const result = await client
                .scan({
                    TableName: 'OrdersTable-dev',
                    Select: "ALL_ATTRIBUTES"
                })
                .promise();

            orders = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!orders) {
            throw new NotFoundException(`Orders not found`);
        }

        return { ok: true, data: orders };
    }
}