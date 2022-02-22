import { PickType } from '@nestjs/swagger';
import { VariantCreateDto } from '.';

export class VariantUpdateDto extends PickType(VariantCreateDto, [
  'active',
  'price',
] as const) {}
