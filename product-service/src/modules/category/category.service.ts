import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, CategoryImage } from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import { objType, ValidateInterface } from 'src/helpers/constants';
import { internalErrMsg, throwError, _isEmpty } from 'src/helpers/methods';
import { FindOperator, In, Repository } from 'typeorm';
import { CategoryCreateDto } from './dto';
import { CategoryUpdateDto } from './dto/category';
import { CategoryImageUpdateDto } from './dto/categoryImage';

type paginationOrIds =
  | {
      take?: number;
      skip?: number;
      order: objType<string>;
      relations: string[];
    }
  | {
      id: FindOperator<any>;
    };

interface ValidateCategoriesAndReturnInterface extends ValidateInterface {
  categories: Category[];
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(CategoryImage)
    private categoryImageRepository: Repository<CategoryImage>,
  ) {}

  async addCategory(category: CategoryCreateDto): Promise<Category> {
    try {
      const newCategory = new Category();
      newCategory.name = category.name;
      newCategory.active = category.active;

      const addedCategory = await this.categoryRepository.save(newCategory);

      return addedCategory;
    } catch (error) {
      throwError(error, {
        message: 'Category already exists',
      });
    }
  }

  async getCategories(queryConditions: PaginationDto): Promise<Category[]> {
    const limit = queryConditions.limit;
    const offset = queryConditions.offset;
    const categoryids = queryConditions.ids;

    let condition: paginationOrIds;

    let categories: Category[];

    try {
      if (categoryids) {
        // for getting categories with specified ids
        condition = {
          id: In(categoryids),
        };

        categories = await this.categoryRepository.find({
          where: condition,
          relations: ['images', 'subCategories'],
        });
      } else {
        // paginated categories
        const limitIsNotANumber = isNaN(limit);
        const offsetIsANumber = !isNaN(offset);

        if (limitIsNotANumber && offsetIsANumber)
          throw internalErrMsg(
            'Offset is not allowed without limit',
            HttpStatus.BAD_REQUEST,
          );

        condition = {
          take: limit,
          skip: offset,
          order: {
            name: 'ASC',
          },
          relations: ['images', 'subCategories'],
        };

        categories = await this.categoryRepository.find(condition);
      }

      return categories;
    } catch (error) {
      throwError(error);
    }
  }

  async getOneCategory(categoryId: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ['images', 'subCategories'],
      });

      return category;
    } catch (error) {
      throwError(error);
    }
  }

  async updateCategory(
    categoryId: string,
    updateObj: CategoryUpdateDto,
  ): Promise<Category> {
    try {
      if (_isEmpty(updateObj))
        throw internalErrMsg(
          'Provide atleast one valid paramter in the request body to update',
          HttpStatus.BAD_REQUEST,
        );

      const { isValid } = await this.validateCategoriesAndReturn({
        id: categoryId,
      });

      if (!isValid)
        throw internalErrMsg('Category is not found', HttpStatus.BAD_REQUEST);

      const updateResult = await this.categoryRepository.update(
        {
          id: categoryId,
        },
        updateObj,
      );

      if (updateResult.affected < 1) throw internalErrMsg();

      const updatedCategory = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ['images', 'subCategories'],
      });

      return updatedCategory;
    } catch (error) {
      throwError(error);
    }
  }

  async toggleActiveStatus(
    categoryId: string,
    setActive: boolean,
  ): Promise<Category> {
    try {
      const { isValid } = await this.validateCategoriesAndReturn({
        id: categoryId,
      });

      if (!isValid)
        throw internalErrMsg('Category is not found', HttpStatus.BAD_REQUEST);

      const setActiveResult = await this.categoryRepository.update(
        {
          id: categoryId,
        },
        { active: setActive },
      );

      if (setActiveResult.affected < 1) throw internalErrMsg();

      const updatedCategory = await this.categoryRepository.findOne(categoryId);

      return updatedCategory;
    } catch (error) {
      throwError(error);
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    try {
      const { isValid } = await this.validateCategoriesAndReturn({
        id: categoryId,
      });

      if (!isValid)
        throw internalErrMsg('Category is not found', HttpStatus.BAD_REQUEST);

      const deleteResult = await this.categoryRepository.delete({
        id: categoryId,
      });

      if (deleteResult.affected < 1) throw internalErrMsg();
    } catch (error) {
      throwError(error);
    }
  }

  async deleteCategories() {
    return;
  }

  async addImage(
    categoryId: string,
    image: { src: string },
  ): Promise<CategoryImage> {
    try {
      const { isValid } = await this.validateCategoriesAndReturn({
        id: categoryId,
      });

      if (!isValid)
        throw internalErrMsg(
          'Category is not found to add the image',
          HttpStatus.BAD_REQUEST,
        );

      const newImage = new CategoryImage();
      newImage.categoryId = categoryId;
      newImage.src = image.src;

      const insertedImage = await this.categoryImageRepository.save(newImage);

      return insertedImage;
    } catch (error) {
      throwError(error);
    }
  }

  async getOneImage(
    categoryId: string,
    imageId: string,
  ): Promise<CategoryImage> {
    try {
      const image = await this.categoryImageRepository.findOne({
        where: {
          id: imageId,
          categoryId,
        },
        relations: ['category'],
      });

      return image;
    } catch (error) {
      throwError(error);
    }
  }

  async getImages(
    categoryId: string,
    imageIds?: string[],
  ): Promise<CategoryImage[]> {
    try {
      const { isValid } = await this.validateCategoriesAndReturn({
        id: categoryId,
      });

      if (!isValid)
        throw internalErrMsg('Category is not found', HttpStatus.BAD_REQUEST);

      const findCondtion: {
        categoryId: string;
        id?: FindOperator<any>;
      } = {
        categoryId,
      };

      if (!_isEmpty(imageIds)) findCondtion.id = In(imageIds);

      const images = await this.categoryImageRepository.find({
        where: findCondtion,
      });

      return images;
    } catch (error) {
      throwError(error);
    }
  }

  async updateImage(
    categoryId: string,
    imageId: string,
    updateObj: CategoryImageUpdateDto,
  ): Promise<CategoryImage> {
    try {
      const updateImageResult = await this.categoryImageRepository.update(
        {
          id: imageId,
          categoryId,
        },
        updateObj,
      );

      if (updateImageResult.affected < 1)
        throw internalErrMsg('Image is not found', HttpStatus.BAD_REQUEST);

      const updatedImage = await this.categoryImageRepository.findOne({
        where: { id: imageId },
        relations: ['category'],
      });

      return updatedImage;
    } catch (error) {
      throwError(error);
    }
  }

  async deleteImage(categoryId: string, imageId: string): Promise<void> {
    try {
      const deleteResult = await this.categoryImageRepository.delete({
        id: imageId,
        categoryId,
      });

      if (deleteResult.affected < 1)
        throw internalErrMsg(
          'Image is not found. Check the category and image id',
          HttpStatus.BAD_REQUEST,
        );
    } catch (error) {
      throwError(error);
    }
  }

  async deleteImages(): Promise<void> {
    return;
  }

  // following function finds a category with given conditions
  // returns 'isValid' true if found
  async validateCategoriesAndReturn(
    conditionObj: objType<any>,
    options?: { relations: string[] },
  ): Promise<ValidateCategoriesAndReturnInterface> {
    try {
      const input: {
        where: objType<any>;
        relations?: string[];
      } = {
        where: conditionObj,
      };

      if (!_isEmpty(options?.relations)) input.relations = options.relations;

      const categories: Category[] = await this.categoryRepository.find(input);

      return { isValid: !_isEmpty(categories), categories };
    } catch (error) {
      throwError(error);
    }
  }
}
