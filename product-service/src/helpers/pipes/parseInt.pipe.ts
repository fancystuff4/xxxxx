import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);

    const { data } = metadata;

    if (isNaN(val))
      throw new BadRequestException([
        data ? `${data} should be a number` : 'Invalid input',
      ]);

    return val;
  }
}
