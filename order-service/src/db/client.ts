import * as AWS from 'aws-sdk';
const client = new AWS.DynamoDB.DocumentClient({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  accessKeyId: 'fake-key',
  secretAccessKey: 'fake-secret',
});
export default client;
