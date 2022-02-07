import { IsNotEmpty } from 'class-validator';

export class CategoryImageCreateDto {
  @IsNotEmpty()
  src: string;
}
