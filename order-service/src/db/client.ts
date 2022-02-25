import * as AWS from 'aws-sdk';
const client = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://localhost:4566',
    region: 'us-east-1',

});
export default client;