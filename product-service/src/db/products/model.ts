import { CreateTableCommand, CreateTableInput } from "@aws-sdk/client-dynamodb";
import client from '../client'
const productTableParams : CreateTableInput = {
    TableName: 'Products',
    KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH'},
        { AttributeName: 'SK', KeyType: 'RANGE'}
    ],
    AttributeDefinitions: [
        {AttributeName:'PK', AttributeType: 'S'},
        {AttributeName:'SK', AttributeType: 'S'},
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }

}

const command = new CreateTableCommand(productTableParams);

client.send(command).then(r => {
    console.log(r);
    
}).catch(e =>{
    console.log('error',e);
    
})