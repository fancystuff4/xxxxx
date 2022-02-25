
   
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderDetailsDto } from './dto/orderDetails.dto'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import client from '../db/client';
import * as moment from 'moment';
import { OrderDetailsArrayFunctionResponseDto } from './dto/orderDetailsArrayFunctionResponse.dto';
import { OrderDetailsFunctionResponseDto } from './dto/orderDetailsFunctionResponse.dto';

export class OrderRepository {
    constructor() {}

    async createOrder(customerId: string, createOrderDetails: CreateOrderDto) : Promise<OrderDetailsFunctionResponseDto> {
        const id : string = uuid();
        const date : string = moment().format('x');
        const newOrder : OrderDetailsDto = {
            id: id,
            customerId: customerId,
            orderDate: parseInt(date),
            ...createOrderDetails
        };

        try {
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

    async getOrderByOrderId(id) : Promise<OrderDetailsFunctionResponseDto> {
        let order: any;
        try {
            const result = await client
                .get({
                    TableName: 'OrdersTable-dev',
                    Key: { id },
                })
                .promise();
            if(Object.keys(result).length===0)
            {
                order = result;
            } else {
                order = result.Item;
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with ID "${id}" not found`);
        }

        return { ok: true, data: order };
    }

    async getOrderByCustomerId(customerId) : Promise<OrderDetailsArrayFunctionResponseDto> {
        let order: any;
        try {
            const result = await client
            .scan({
                TableName : 'OrdersTable-dev',
                FilterExpression : 'customerId = :id',
                ExpressionAttributeValues : {
                    ':id' : customerId
                }
            })
            .promise();
            order = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with Customer ID "${customerId}" not found`);
        }

        return { ok: true, data: order };
    }

    async getOrdersByDateRangeAndCustomerId(startingDate,endingDate,customerId) : Promise<OrderDetailsArrayFunctionResponseDto> {
        let order: any;
        try {
            const result = await client
            .scan({
                TableName : 'OrdersTable-dev',
                FilterExpression : 'orderDate BETWEEN :sd AND :ed and customerId = :id',
                ExpressionAttributeValues : {
                    ':sd' : startingDate,
                    ':ed' : endingDate,
                    ':id' : customerId
                }
            })
            .promise();
            order = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with date range of customer id "${customerId}" not found`);
        }

        return { ok: true, data: order };
    }

    async getOrderByDateRange(startDate: number, endDate: number): Promise<OrderDetailsArrayFunctionResponseDto> {
        let order: OrderDetailsDto[];
        try {
            const result : any = await client
            .scan({
                TableName : 'OrdersTable-dev',
                FilterExpression : '#od BETWEEN :sd AND :ed',
                ExpressionAttributeValues : {
                    ':sd' : startDate,
                    ':ed' : endDate
                },
                ExpressionAttributeNames: {
                    "#od": "orderDate"
                }
            })
            .promise();
            order = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with date range not found`);
        }

        return { ok: true, data: order };
    }

    async getOrdersByOrderStatus(orderStatus : string) : Promise<OrderDetailsArrayFunctionResponseDto> {
        let order: any;
        try {
            const result = await client
            .scan({
                TableName : 'OrdersTable-dev',
                FilterExpression : 'orderStatus = :status',
                ExpressionAttributeValues : {
                    ':status' : orderStatus
                }
            })
            .promise();
            order = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!order) {
            throw new NotFoundException(`Order with Order Status "${orderStatus}" not found`);
        }

        return { ok: true, data: order };
    }

    async getAllOrders() : Promise<OrderDetailsArrayFunctionResponseDto> {
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

    async updatedOrder(body: any, id: string) : Promise<OrderDetailsFunctionResponseDto> {
        let order;
        try {
            const result = await client
                .update({
                    TableName: 'OrdersTable-dev',
                    Key: { id },
                    UpdateExpression: "set #paymentStatus = :p, #orderStatus = :o",
                    ExpressionAttributeValues: {
                        ":p": `${body.paymentStatus}`,
                        ":o": `${body.orderStatus}`
                    },
                    ExpressionAttributeNames:{
                        "#paymentStatus": "paymentStatus",
                        "#orderStatus": "orderStatus"
                    },
                    ReturnValues:"ALL_NEW"
                })
                .promise();
                order= result.Attributes;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: order };
    }

    async deleteOrderById(id: string) : Promise<OrderDetailsFunctionResponseDto>{
        let order;
        try {
            const result = await client
            .delete({
                TableName: 'OrdersTable-dev',
                Key: { id },
                ReturnValues: 'ALL_OLD',
            })
            .promise();
            order= result.Attributes;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: order };
      }
}