import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Brand } from './brand.entity';

export enum BrandLogoSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export type BrandLogoType = { src: string; size: BrandLogoSize };

@Entity()
@Index(['brand', 'sizeType'], { unique: true })
export class BrandLogo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  src: string;

  @Column({
    type: 'enum',
    enum: BrandLogoSize,
    default: BrandLogoSize.MEDIUM,
  })
  sizeType: BrandLogoSize;

  @ManyToOne(() => Brand, (brand) => brand.logos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand: Brand;

  @Column()
  brandId: string;
}
