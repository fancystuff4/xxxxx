import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './sub-category.entity';

export enum OptionType {
  COLOR = 'COLOR',
  GENERIC = 'GENERIC', // GENERIC will hold options which will
  // be literally displayed on the screen
}

@Entity()
@Index(['optionName', 'subCategoryId'], { unique: true })
export class SubCategoryOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  optionName: string;

  @Column({
    type: 'simple-array',
  })
  availableValues: string[];

  @Column({
    type: 'simple-enum',
    enum: OptionType,
    default: OptionType.GENERIC,
  })
  optionType: OptionType;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.id)
  subCategory: SubCategory;

  @Column()
  subCategoryId: string;
}
