import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '.';
import { SubCategoryOption } from '..';

@Entity()
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

  @ManyToOne(() => SubCategoryOption, undefined, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  subCatOption: SubCategoryOption;

  @Column({ nullable: true })
  subCatOptionId: string;

  @Column()
  productId: string;
}
