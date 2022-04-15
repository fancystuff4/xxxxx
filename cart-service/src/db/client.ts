import * as AWS from 'aws-sdk';
// import { DynamoDBClient} from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocumentClient} from '@aws-sdk/lib-dynamodb'

const client = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://localhost:4566',
    region: 'us-east-1',
    accessKeyId: 'fake-key',
    secretAccessKey: 'fake-secret',
});
// const dynamoClient = new DynamoDBClient({
//     region:' us-east-1',
//     endpoint: 'http://localhost:4566',
// })

// const docClient = DynamoDBDocumentClient.from(dynamoClient);

export default client;