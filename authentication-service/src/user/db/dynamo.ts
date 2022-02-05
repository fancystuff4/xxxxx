import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class Dynamo {
  client: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient({
      endpoint: 'http://localhost:3010',
      region: 'us-east-1',
    });
  }
}
