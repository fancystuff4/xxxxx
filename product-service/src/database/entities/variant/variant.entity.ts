import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VariantImage, VariantOption } from '.';
import { Product } from '..';

@Entity()
@Index(['name', 'productId'], { unique: true })
export class Variant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @OneToMany(() => VariantImage, (image) => image.variant)
  images: VariantImage[];

  @OneToMany(() => VariantOption, (variantOption) => variantOption.variant)
  options: VariantOption[];

  @Column()
  productId: string;
}
