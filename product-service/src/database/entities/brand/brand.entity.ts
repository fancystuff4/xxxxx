import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BrandLogo } from './brand-logo.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => BrandLogo, (logo) => logo.brand)
  logos: BrandLogo[];
}
