import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpStatus,
} from '@nestjs/common';
import { INTERNAL, internalErrMsg, throwError, _isArray } from '../methods';

type arrayOrUndefined = any[] | undefined;

@Injectable()
export class ParseArrayFromOptionalString
  implements PipeTransform<string, arrayOrUndefined>
{
  transform(value: string, metadata: ArgumentMetadata): arrayOrUndefined {
    try {
      if (!value) return;

      const extractedArray = JSON.parse(value);
      if (!_isArray(extractedArray))
        throw internalErrMsg(
          'Ids must be an array of UUIDs',
          HttpStatus.BAD_REQUEST,
        );

      return extractedArray;
    } catch (error) {
      throwError({
        errMsg: 'ids should be an array of UUIDs',
        errOrigin: INTERNAL,
        errCode: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
