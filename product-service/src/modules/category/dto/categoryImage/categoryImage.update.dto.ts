import { IsNotEmpty } from 'class-validator';

export class CategoryImageUpdateDto {
  @IsNotEmpty()
  src: string;
}
