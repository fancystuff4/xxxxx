import * as AWS from 'aws-sdk';

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
});

export default dynamoClient;
