import { FindOperator } from 'typeorm';

export const EMPTY_OBJECT = {};
export const LIMIT = 'limit';
export const OFFSET = 'offset';
export type objType<T> = {
  [key: string]: T;
};

export enum AddOrReplace {
  ADD = 'ADD',
  REPLACE = 'REPLACE',
}

export interface ValidateInterface {
  isValid: boolean;
}

export type paginationOrIds =
  | {
      take?: number;
      skip?: number;
      order: objType<string>;
      relations: string[];
    }
  | {
      id: FindOperator<any>;
    };
