import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage, ProductOption } from '.';
import { SubCategory } from '..';
import { Variant } from '../variant';

@Entity()
@Index(['name', 'subCategoryId'], { unique: true })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  subCategory: SubCategory;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: ['insert'],
  })
  variants: Variant[];

  @OneToMany(() => ProductOption, (productOption) => productOption.product)
  options: ProductOption[];

  @Column()
  subCategoryId: string;

  @Column()
  description: string;
}
