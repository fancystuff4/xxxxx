import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class Dynamo {
  client: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient({
      accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
      endpoint: process.env.DYNAMO_ENDPOINT,
      region: process.env.DYNAMO_REGION,
      secretAccessKey: process.env.DYNAMO_SECRET_KEY,
    });
  }
}
