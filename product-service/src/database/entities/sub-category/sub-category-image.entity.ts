import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub-category.entity';

@Entity()
export class SubCategoryImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  src: string;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.images)
  subCategory: SubCategory;

  @Column()
  subCategoryId: string;
}
