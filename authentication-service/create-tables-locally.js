require('dotenv').config()
const fs = require('fs');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const yaml = require('js-yaml');
const cloudformationSchema = require('@serverless/utils/cloudformation-schema');

const SERVERLESS_CONFIG = __dirname + '/serverless.yml';
const ddb = new DynamoDB({
  accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
  endpoint: process.env.DYNAMO_ENDPOINT,
  region: process.env.DYNAMO_REGION,
  secretAccessKey: process.env.DYNAMO_SECRET_KEY,
});
async function getDynamoDBTableResources() {
  console.info(SERVERLESS_CONFIG);

  const orderTable = yaml.loadAll(fs.readFileSync(SERVERLESS_CONFIG), {
    schema: cloudformationSchema,
  })[0].resources.Resources;
  console.log(
    yaml.loadAll(orderTable.orderTable, { schema: cloudformationSchema }),
  );

  const tables = Object.entries(
    yaml.loadAll(fs.readFileSync(SERVERLESS_CONFIG), {
      schema: cloudformationSchema,
    })[0].resources.Resources,
  ).filter(([, resource]) => resource.Type === 'AWS::DynamoDB::Table');
  console.info('Tables from yml', tables);
  return tables;
}
(async function main() {
  console.info('Setting up local DynamoDB tables');
  const tables = await getDynamoDBTableResources();
  const existingTables = (await ddb.listTables().promise()).TableNames;

  for await ([logicalId, definition] of tables) {
    const {
      Properties: {
        BillingMode,
        TableName,
        AttributeDefinitions,
        KeySchema,
        GlobalSecondaryIndexes,
      },
    } = definition;
    console.info('dddd', logicalId, definition);
    if (
      existingTables.find((table) => {
        console.log('Table', table);
        return table === TableName;
      })
    ) {
      console.info(
        `${logicalId}: DynamoDB Local - Table already exists: ${TableName}. Skipping..`,
      );
      continue;
    }
    await ddb
      .createTable({
        AttributeDefinitions,
        BillingMode,
        KeySchema,
        TableName,
        GlobalSecondaryIndexes,
      })
      .promise();
    console.info(`${logicalId}: DynamoDB Local - Created table: ${TableName}`);
  }
})();
