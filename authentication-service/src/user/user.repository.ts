import { Injectable } from '@nestjs/common';
import { internalErrMsg } from 'src/common/helpers';
import { DYNAMO_CONDITIONAL_ERROR } from './common';
import { Dynamo } from './db/dynamo';

@Injectable()
export class UserRepository {
  constructor(private database: Dynamo) {}

  async find(conditions: any): Promise<any> {
    try {
      const result = await this.database.client
        .query({
          TableName: 'user-table',
          ...conditions,
        })
        .promise();

      return result;
    } catch (error) {
      return internalErrMsg();
    }
  }

  async create(input: object, otherOptions = {}): Promise<any> {
    try {
      const result = await this.database.client
        .put({
          TableName: 'user-table',
          Item: input,
          ...otherOptions,
        })
        .promise();

      return result;
    } catch (error) {
      if (error.code === DYNAMO_CONDITIONAL_ERROR)
        return internalErrMsg(DYNAMO_CONDITIONAL_ERROR);

      return internalErrMsg();
    }
  }

  async updateOne(username: string, SK: string, otherInputs: any) {
    try {
      const result = await this.database.client
        .update({
          TableName: 'user-table',
          KeyConditionExpression: `username = ${username} and SK = ${SK}`,
          ...otherInputs,
        })
        .promise();

      return result;
    } catch (error) {
      return internalErrMsg();
    }
  }
}
