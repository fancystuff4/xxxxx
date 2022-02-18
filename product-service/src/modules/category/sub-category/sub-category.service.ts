import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SubCategory,
  SubCategoryImage,
  SubCategoryOption,
} from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import {
  AddOrReplace,
  objType,
  paginationOrIds,
  ValidateInterface,
} from 'src/helpers/constants';
import {
  ensureNoOffsetWithoutLimit,
  internalErrMsg,
  throwError,
  _isEmpty,
} from 'src/helpers/methods';
import { In, Repository } from 'typeorm';
import { CategoryService } from '../category.service';
import {
  SubCatCreateDto,
  SubCatUpdateDto,
  SubCatImageCreateObj,
  SubCatOptUpdateDto,
  SubCatOptCreateObj,
} from '../dto';

interface ValidateSubCatsAndReturnInterface extends ValidateInterface {
  subCategories: SubCategory[];
}

@Injectable()
export class SubCategoryService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(SubCategory)
    private subCategoryRepo: Repository<SubCategory>,
    @InjectRepository(SubCategoryOption)
    private subCatOptRepo: Repository<SubCategoryOption>,
    @InjectRepository(SubCategoryImage)
    private subCatImageRepo: Repository<SubCategoryImage>,
  ) {}

  async createSubCategory(
    categoryId: string,
    subCatObj: SubCatCreateDto,
  ): Promise<SubCategory> {
    try {
      const newSubCategory = new SubCategory();
      newSubCategory.name = subCatObj.name;
      newSubCategory.active = subCatObj.active;
      newSubCategory.categoryId = categoryId;

      const savedSubCategory = await this.subCategoryRepo.save(newSubCategory);

      return savedSubCategory;
    } catch (error) {
      throwError(error, {
        message: 'A sub-category with the same name exists for this category',
      });
    }
  }

  async getSubCategory(
    categoryId: string,
    subCategoryId: string,
  ): Promise<SubCategory> {
    try {
      const subCategory = await this.subCategoryRepo.findOne({
        where: {
          id: subCategoryId,
          categoryId,
        },
        relations: ['category', 'images', 'options'],
      });

      return subCategory;
    } catch (error) {
      throwError(error);
    }
  }

  async getSubCategories(
    categoryId: string,
    queryConditions: PaginationDto,
  ): Promise<SubCategory[]> {
    const limit = queryConditions.limit;
    const offset = queryConditions.offset;

    const subCategoryIds = queryConditions.ids;

    let condition: paginationOrIds;
    let subCategories: SubCategory[];

    try {
      if (subCategoryIds) {
        // getting subcategories when some ids are sent as an array in query params

        condition = { id: In(subCategoryIds) };

        subCategories = await this.subCategoryRepo.find({
          where: { ...condition, categoryId },
          relations: ['category', 'images', 'options'],
        });
      } else {
        // if no ids array is provided, but pagination is there

        ensureNoOffsetWithoutLimit(limit, offset);

        condition = {
          take: limit,
          skip: offset,
          order: {
            name: 'ASC',
          },
          relations: ['category', 'images', 'options'],
        };

        subCategories = await this.subCategoryRepo.find(condition);
      }

      return subCategories;
    } catch (error) {
      throwError(error);
    }
  }

  async updateSubCategory(
    categoryId: string,
    subCategoryId: string,
    updateObj: SubCatUpdateDto,
  ): Promise<SubCategory> {
    try {
      if (_isEmpty(updateObj))
        throw internalErrMsg(
          'Provide atleast one valid paramter in the request body to update',
          HttpStatus.BAD_REQUEST,
        );

      const { isValid } = await this.validateSubCategoriesAndReturn({
        id: subCategoryId,
        categoryId,
      });

      if (!isValid)
        throw internalErrMsg(
          'No such sub-category is found for the provided category',
          HttpStatus.BAD_REQUEST,
        );

      const updateResult = await this.subCategoryRepo.update(
        { id: subCategoryId, categoryId },
        updateObj,
      );

      if (updateResult.affected < 1) throw internalErrMsg();

      const updatedSubCategory = await this.subCategoryRepo.findOne({
        where: { id: subCategoryId, categoryId },
        relations: ['category', 'images'],
      });

      return updatedSubCategory;
    } catch (error) {
      throwError(error);
    }
  }

  async toggleActiveStatus(
    categoryId: string,
    subCategoryId: string,
    newActiveStatus: boolean,
  ): Promise<SubCategory> {
    try {
      const { isValid } = await this.validateSubCategoriesAndReturn({
        id: subCategoryId,
        categoryId,
      });

      if (!isValid)
        throw internalErrMsg(
          'Invalid sub-category id for the given category',
          HttpStatus.BAD_REQUEST,
        );

      const updateActiveStatusResult = await this.subCategoryRepo.update(
        {
          id: subCategoryId,
          categoryId,
        },
        {
          active: newActiveStatus,
        },
      );

      if (updateActiveStatusResult.affected < 1) throw internalErrMsg();

      const updatedSubCategory = await this.subCategoryRepo.findOne({
        where: { id: subCategoryId },
        relations: ['category', 'images'],
      });

      return updatedSubCategory;
    } catch (error) {
      throwError(error);
    }
  }

  async deleteSubCategory(
    categoryId: string,
    subCategoryId: string,
  ): Promise<void> {
    try {
      const deleteResult = await this.subCategoryRepo.delete({
        id: subCategoryId,
        categoryId,
      });

      if (deleteResult.affected < 1)
        throw internalErrMsg(
          'No such sub-category is found to delete',
          HttpStatus.BAD_REQUEST,
        );
    } catch (error) {
      throwError(error);
    }
  }

  async createSubCatOptions(
    categoryId: string,
    subCategoryId: string,
    subCatOptions: SubCatOptCreateObj[],
  ): Promise<SubCategoryOption[]> {
    try {
      const { isValid } = await this.validateSubCategoriesAndReturn({
        id: subCategoryId,
        categoryId,
      });

      if (!isValid)
        throw internalErrMsg('Invalid sub-category', HttpStatus.BAD_REQUEST);

      const newOptions: SubCategoryOption[] = [];
      subCatOptions.forEach((option) => {
        let optionObj = new SubCategoryOption();
        optionObj = { ...optionObj, ...option };
        optionObj.subCategoryId = subCategoryId;

        newOptions.push(optionObj);
      });

      const insertedOptions = await this.subCatOptRepo.save(newOptions);

      return insertedOptions;
    } catch (error) {
      throwError(error, {
        message:
          'One of the provided optionNames already exists for this sub-category',
      });
    }
  }

  async getSubCatOptionById(
    categoryId: string,
    subCategoryId: string,
    optionId: string,
  ): Promise<SubCategoryOption> {
    try {
      const { isValid } = await this.validateSubCategoriesAndReturn({
        id: subCategoryId,
        categoryId,
      });

      if (!isValid)
        throw internalErrMsg(
          'sub-category id and category id is not matching',
          HttpStatus.BAD_REQUEST,
        );

      const option = await this.subCatOptRepo.findOne({
        where: { id: optionId, subCategoryId },
        relations: ['subCategory', 'subCategory.category'],
      });

      return option;
    } catch (error) {
      throwError(error);
    }
  }

  async getOptionsBySubCategoryId(
    categoryId: string,
    subCategoryId: string,
  ): Promise<SubCategoryOption[]> {
    try {
      const options = await this.subCatOptRepo
        .createQueryBuilder('option')
        .leftJoinAndSelect('option.subCategory', 'subCategory')
        .leftJoinAndSelect('subCategory.category', 'category')
        .where('option.subCategoryId = :subCategoryId', { subCategoryId })
        .andWhere('subCategory.categoryId = :categoryId', { categoryId })
        .getMany();

      return options;
    } catch (error) {
      throwError(error);
    }
  }

  async updateSubCategoryOption(
    categoryId: string,
    subCategoryId: string,
    subCategoryOptId: string,
    updateObj: SubCatOptUpdateDto,
  ): Promise<SubCategoryOption> {
    try {
      const {
        isValid,
        subCategories: [correspondingSubCategory],
      } = await this.validateSubCategoriesAndReturn(
        {
          id: subCategoryId,
          categoryId,
        },
        {
          relations: ['options'],
        },
      );

      if (!isValid)
        throw internalErrMsg(
          'Invalid sub-category. Please check the category and sub-category ids',
          HttpStatus.BAD_REQUEST,
        );

      const { addOrReplace, ...restUpdateObj } = updateObj;

      if (addOrReplace === AddOrReplace.ADD) {
        if (_isEmpty(restUpdateObj['availableValues']))
          throw internalErrMsg(
            'If addOrReplace value is ADD, then availableValues should be an array',
            HttpStatus.BAD_REQUEST,
          );
        const correspondingOption = correspondingSubCategory.options.find(
          (option) => option.id === subCategoryOptId,
        );

        if (!correspondingOption)
          throw internalErrMsg(
            'The sub-category does not have an option with the provided id',
            HttpStatus.BAD_REQUEST,
          );

        const availableValues = correspondingOption['availableValues'];

        const duplicateValue = restUpdateObj['availableValues'].find((value) =>
          availableValues.includes(value),
        );

        if (duplicateValue)
          throw internalErrMsg(
            `${duplicateValue} is already present for available-values`,
            HttpStatus.BAD_REQUEST,
          );

        restUpdateObj['availableValues'] = availableValues.concat(
          restUpdateObj['availableValues'],
        );
      }

      if (_isEmpty(restUpdateObj))
        throw internalErrMsg(
          'Atleast one valid paramter value is required to update',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.subCatOptRepo.update(
        {
          id: subCategoryOptId,
          subCategoryId,
        },
        restUpdateObj,
      );

      if (affected < 1) throw internalErrMsg();

      const updatedOption = await this.subCatOptRepo.findOne({
        where: { id: subCategoryOptId, subCategoryId },
        relations: ['subCategory', 'subCategory.category'],
      });

      return updatedOption;
    } catch (error) {
      throwError(error, {
        message:
          'The sub-category already has an option with the provided name',
      });
    }
  }

  async toggleActiveOfOption(
    categoryId: string,
    subCategoryId: string,
    optionId: string,
    newActiveStatus: boolean,
  ): Promise<SubCategoryOption> {
    try {
      const {
        isValid,
        subCategories: [correspondingSubCategory],
      } = await this.validateSubCategoriesAndReturn(
        {
          id: subCategoryId,
          categoryId,
        },
        {
          relations: ['options'],
        },
      );

      if (!isValid)
        throw internalErrMsg(
          'Invalid sub-category. Please check the sub-category and category id',
          HttpStatus.BAD_REQUEST,
        );

      const correspondingOption = correspondingSubCategory.options.find(
        (option) => option.id === optionId,
      );

      if (_isEmpty(correspondingOption))
        throw internalErrMsg(
          'Invalid option id for the provided sub-category id',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.subCatOptRepo.update(
        {
          id: optionId,
          subCategoryId,
        },
        {
          active: newActiveStatus,
        },
      );

      if (affected < 1) throw internalErrMsg();
      const updatedOption = await this.subCatOptRepo.findOne({
        where: {
          id: optionId,
          subCategoryId,
        },
        relations: ['subCategory', 'subCategory.category'],
      });

      return updatedOption;
    } catch (error) {
      throwError(error);
    }
  }

  async deleteSubCategoryOption(
    categoryId: string,
    subCategoryId: string,
    optionId: string,
  ): Promise<void> {
    try {
      const {
        isValid,
        subCategories: [correspondingSubCategory],
      } = await this.validateSubCategoriesAndReturn(
        {
          id: subCategoryId,
          categoryId,
        },
        {
          relations: ['options'],
        },
      );

      if (!isValid)
        throw internalErrMsg(
          'Invalid sub-category. Please check the category and sub-category id properly.',
          HttpStatus.BAD_REQUEST,
        );

      const correspondingOption = correspondingSubCategory.options?.find(
        (option) => option.id === optionId,
      );

      if (!correspondingOption)
        throw internalErrMsg(
          'No such option is found for the provided sub-category.',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.subCatOptRepo.delete({
        id: optionId,
        subCategoryId,
      });

      if (affected < 1) throw internalErrMsg();
    } catch (error) {
      throwError(error);
    }
  }

  async addSubCategoryImages(
    categoryId: string,
    subCategoryId: string,
    images: SubCatImageCreateObj[],
  ): Promise<SubCategoryImage[]> {
    try {
      const { isValid } = await this.validateSubCategoriesAndReturn({
        id: subCategoryId,
        categoryId,
      });

      if (!isValid)
        throw internalErrMsg('Invalid sub-category.', HttpStatus.BAD_REQUEST);

      const newImages: SubCategoryImage[] = [];

      images.forEach((inputImage) => {
        let newImageObj = new SubCategoryImage();

        newImageObj = { ...newImageObj, ...inputImage };
        newImageObj.subCategoryId = subCategoryId;

        newImages.push(newImageObj);
      });

      const insertedImages = await this.subCatImageRepo.save(newImages);

      return insertedImages;
    } catch (error) {
      console.log('in insert', error);

      throwError(error);
    }
  }

  async getImagesBySubCatId(
    categoryId: string,
    subCategoryId: string,
  ): Promise<SubCategoryImage[]> {
    try {
      const {
        isValid,
        subCategories: [correspondingSubCategory],
      } = await this.validateSubCategoriesAndReturn(
        {
          id: subCategoryId,
          categoryId,
        },
        {
          relations: ['images', 'images.subCategory'],
        },
      );

      if (!isValid)
        throw internalErrMsg('Invalid sub-category', HttpStatus.BAD_REQUEST);

      return correspondingSubCategory.images;
    } catch (error) {
      console.log('in get images', error);
      throwError(error);
    }
  }

  async getSubCategoryImageById(
    categoryId: string,
    subCategoryId: string,
    imageId: string,
  ): Promise<SubCategoryImage> {
    try {
      const {
        isValid,
        subCategories: [correspondingSubCategory],
      } = await this.validateSubCategoriesAndReturn(
        {
          id: subCategoryId,
          categoryId,
        },
        {
          relations: ['images', 'images.subCategory'],
        },
      );

      if (!isValid)
        throw internalErrMsg('Invalid sub-category', HttpStatus.BAD_REQUEST);

      const image = correspondingSubCategory.images.find(
        (image) => image.id === imageId,
      );

      return image;
    } catch (error) {
      console.log('in get one image', error);
      throwError(error);
    }
  }

  async deleteSubCategoryImageById(
    categoryId: string,
    subCategoryId: string,
    imageId: string,
  ): Promise<void> {
    try {
      const {
        isValid,
        subCategories: [correspondingSubCategory],
      } = await this.validateSubCategoriesAndReturn(
        {
          id: subCategoryId,
          categoryId,
        },
        {
          relations: ['images'],
        },
      );

      if (!isValid)
        throw internalErrMsg('Invalid sub-category.', HttpStatus.BAD_REQUEST);

      const image = correspondingSubCategory.images.find(
        (image) => image.id === imageId,
      );

      if (!image)
        throw internalErrMsg(
          'No image is found with the provided id. Check the category, sub-category and image id',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.subCatImageRepo.delete({
        id: imageId,
        subCategoryId,
      });

      if (affected < 1) throw internalErrMsg();
    } catch (error) {
      console.log('in delete image', error);
      throwError(error);
    }
  }

  async validateSubCategoriesAndReturn(
    conditionObj: objType<any>,
    options?: { relations: string[] },
  ): Promise<ValidateSubCatsAndReturnInterface> {
    try {
      const input: {
        where: objType<any>;
        relations?: string[];
      } = {
        where: conditionObj,
      };

      if (!_isEmpty(options?.relations)) input.relations = options.relations;

      const subCategories: SubCategory[] = await this.subCategoryRepo.find(
        input,
      );

      return { isValid: !_isEmpty(subCategories), subCategories };
    } catch (error) {
      throwError(error);
    }
  }
}
