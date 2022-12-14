import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '.';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  src: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @Column()
  productId: string;
}
