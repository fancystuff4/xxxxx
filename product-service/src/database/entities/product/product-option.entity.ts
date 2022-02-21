import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '.';
import { SubCategoryOption } from '..';

@Entity()
@Index(['productId', 'subCatOptionId'], { unique: true })
export class ProductOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'simple-array',
  })
  availableValues: string[];

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Product, (product) => product.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => SubCategoryOption, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  subCatOption: SubCategoryOption;

  @Column()
  subCatOptionId: string;

  @Column()
  productId: string;
}
