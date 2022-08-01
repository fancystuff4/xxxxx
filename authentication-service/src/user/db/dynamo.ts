import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class Dynamo {
  client: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient({
      accessKeyId: 'fake-key',
      endpoint: 'http://localhost:4566',
      region: 'us-east-1',
      secretAccessKey: 'fake-secret',
    });
  }
}
