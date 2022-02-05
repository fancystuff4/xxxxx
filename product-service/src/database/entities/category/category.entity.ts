import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryImage } from './category-image.entity';
import { SubCategory } from '../sub-category/sub-category.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => CategoryImage, (image) => image.category)
  images: CategoryImage[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];
}
