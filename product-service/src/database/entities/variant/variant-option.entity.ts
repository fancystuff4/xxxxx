import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Variant } from '.';
import { SubCategoryOption } from '..';

@Entity()
@Index(['subCatOptionId', 'variant'], { unique: true })
export class VariantOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => SubCategoryOption, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  subCatOption: SubCategoryOption;

  @ManyToOne(() => Variant, (variant) => variant.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  variant: Variant;

  @Column()
  subCatOptionId: string;
}
