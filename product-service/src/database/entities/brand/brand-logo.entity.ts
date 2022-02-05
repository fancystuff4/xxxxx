import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Brand } from './brand.entity';

export type BrandLogoType = { src: string; size: 'Small' | 'Medium' | 'Large' };

@Entity()
export class BrandLogo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'simple-json',
  })
  logo: BrandLogoType;

  @ManyToOne(() => Brand, (brand) => brand.logos)
  brand: Brand[];
}
