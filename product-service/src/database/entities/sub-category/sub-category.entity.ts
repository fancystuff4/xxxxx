import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Product } from '../product';
import { SubCategoryImage } from './sub-category-image.entity';
import { SubCategoryOption } from './sub-category-option.entity';

@Entity()
@Index(['name', 'categoryId'], { unique: true })
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => SubCategoryImage, (image) => image.subCategory)
  images: SubCategoryImage[];

  @OneToMany(
    () => SubCategoryOption,
    (subCategoryOption) => subCategoryOption.subCategory,
  )
  options: SubCategoryOption[];

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];

  @Column()
  categoryId: string;
}
