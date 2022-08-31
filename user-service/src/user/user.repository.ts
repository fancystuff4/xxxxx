import { Injectable } from '@nestjs/common';
import { internalErrMsg } from 'src/user/common';
import { DYNAMO_CONDITIONAL_ERROR } from './common';
import { Dynamo } from './db/dynamo';

@Injectable()
export class UserRepository {
  constructor(private database: Dynamo) {}

  async find(conditions: any): Promise<any> {
    try {
      const result = await this.database.client
        .query({
          TableName: 'userProfile-table',
          ...conditions,
        })
        .promise();

      return result;
    } catch (error) {
      return internalErrMsg();
    }
  }

  async findByPrimaryKey(conditions: any): Promise<any> {
    try {
      const result = await this.database.client
        .get({
          TableName: 'userProfile-table',
          ...conditions,
        })
        .promise();

      return result;
    } catch (error) {
      return internalErrMsg();
    }
  }

  async create(item: any, otherValues: any): Promise<any> {
    try {
      const result = await this.database.client
        .put({
          TableName: 'userProfile-table',
          Item: { ...item, ...otherValues },
        })
        .promise();

      return result;
    } catch (error) {
      if (error.code === DYNAMO_CONDITIONAL_ERROR)
        return internalErrMsg(DYNAMO_CONDITIONAL_ERROR);
      return internalErrMsg();
    }
  }

  async updateOne(conditions: any): Promise<any> {
    try {
      const params = {
        TableName: 'userProfile-table',
        ...conditions,
      };
      const result = await this.database.client.update(params).promise();

      return result;
    } catch (error) {
      return internalErrMsg();
    }
  }
}
