import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Variant } from '.';

@Entity()
export class VariantImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  src: string;

  @ManyToOne(() => Variant, (variant) => variant.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  variant: Variant;

  @Column()
  variantId: string;
}
