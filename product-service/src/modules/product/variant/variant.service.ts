import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant, VariantImage, VariantOption } from 'src/database/entities';
import { objType, ValidateInterface } from 'src/helpers/constants';
import { throwError, _isEmpty, internalErrMsg } from 'src/helpers/methods';
import { FindOperator, In, Repository } from 'typeorm';
import { VariantAndOptionCreateDto } from '../dto';
import { VariantUpdateDto } from '../dto/variant';
import { VariantImageCreateObj } from '../dto/variantImage';

interface ValidateVariantsAndReturnInterface extends ValidateInterface {
  variants: Variant[];
}

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
    @InjectRepository(VariantOption)
    private variantOptRepository: Repository<VariantOption>,
    @InjectRepository(VariantImage)
    private variantImageRepository: Repository<VariantImage>,
  ) {}

  getNewVariantAndOptionsArray(
    productId: string,
    variantsObjArray: VariantAndOptionCreateDto[],
  ): {
    newVariantsArray: Variant[];
    optionsArray: VariantOption[];
  } {
    const newVariantsArray: Variant[] = [];
    const optionsArray: VariantOption[] = [];
    variantsObjArray.forEach((obj) => {
      let newVariant = new Variant();
      const { options, ...variantAttrs } = obj;

      newVariant = {
        ...newVariant,
        ...variantAttrs,
        productId,
      };

      newVariantsArray.push(newVariant);

      options.forEach((option) => {
        let newOption = new VariantOption();
        newOption = { ...newOption, ...option, variant: newVariant };
        optionsArray.push(newOption);
      });
    });

    return { newVariantsArray, optionsArray };
  }

  async createVariants(
    productId: string,
    variantsObjArray: VariantAndOptionCreateDto[],
  ) {
    try {
      const { newVariantsArray, optionsArray } =
        this.getNewVariantAndOptionsArray(productId, variantsObjArray);

      await this.variantRepository.save(newVariantsArray);
      await this.variantOptRepository.save(optionsArray);
    } catch (error) {
      throwError(error);
    }
  }

  async editVariant(
    productId: string,
    variantId: string,
    updateObj: VariantUpdateDto,
  ): Promise<Variant> {
    try {
      if (_isEmpty(updateObj))
        throw internalErrMsg(
          'Please provide atleast one valid parameter to update',
          HttpStatus.BAD_REQUEST,
        );

      const { isValid } = await this.validateVariantsAndReturn({
        id: variantId,
        productId,
      });

      if (!isValid)
        throw internalErrMsg('Invalid variant', HttpStatus.BAD_REQUEST);

      const { affected } = await this.variantRepository.update(
        {
          id: variantId,
        },
        updateObj,
      );

      if (affected < 1) throw internalErrMsg();

      const updatedVariant = await this.variantRepository.findOne({
        where: { id: variantId },
      });

      return updatedVariant;
    } catch (error) {
      throwError(error);
    }
  }

  async toggleVariantActiveStatus(
    productId: string,
    variantId: string,
    active: boolean,
  ): Promise<Variant> {
    try {
      const { isValid } = await this.validateVariantsAndReturn({
        id: variantId,
        productId,
      });

      if (!isValid)
        throw internalErrMsg(
          'No such variant is present for the product.',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.variantRepository.update(
        {
          id: variantId,
        },
        {
          active,
        },
      );

      if (affected < 1) throw internalErrMsg();

      const updatedVariant = await this.variantRepository.findOne(variantId);
      return updatedVariant;
    } catch (error) {
      throwError(error);
    }
  }

  async getVariants(
    productId: string,
    variantIds?: string[],
  ): Promise<Variant[]> {
    try {
      const input: {
        productId: string;
        id?: FindOperator<any>;
      } = {
        productId,
      };

      if (variantIds) input.id = In(variantIds);

      const { variants } = await this.validateVariantsAndReturn(input, {
        relations: ['product', 'options', 'images'],
      });

      return variants;
    } catch (error) {
      throwError(error);
    }
  }

  async getSingleVariant(
    productId: string,
    variantId: string,
  ): Promise<Variant> {
    try {
      const variant = await this.validateSingleVariantAndReturn({
        id: variantId,
        productId,
      }, {
        relations: ['product', 'options', 'options.subCatOption', 'images'],
      });
      return variant;
    } catch (error) {
      throwError(error);
    }
  }

  async deleteVariantById(productId: string, variantId: string): Promise<void> {
    try {
      const { isValid } = await this.validateVariantsAndReturn({
        id: variantId,
        productId,
      });

      if (!isValid)
        throw internalErrMsg(
          'Invalid variant. Please check the product id and the variant id.',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.variantRepository.delete({
        id: variantId,
      });

      if (affected < 1) throw internalErrMsg();
    } catch (error) {
      throwError(error);
    }
  }

  // get variant options by id
  async getVariantOptionsByVariantId(
    productId: string,
    variantId: string,
  ): Promise<VariantOption[]> {
    try {
      const {
        isValid,
        variants: [correspondingVariant],
      } = await this.validateVariantsAndReturn(
        {
          id: variantId,
          productId,
        },
        {
          relations: ['options', 'options.subCatOption'],
        },
      );

      if (!isValid)
        throw internalErrMsg(
          'Invalid variant. Please check the product id and the variant id.',
          HttpStatus.BAD_REQUEST,
        );

      return correspondingVariant.options;
    } catch (error) {
      throwError(error);
    }
  }

  async addVariantImages(
    productId: string,
    variantId: string,
    images: VariantImageCreateObj[],
  ): Promise<VariantImage[]> {
    try {
      const { isValid } = await this.validateVariantsAndReturn({
        id: variantId,
        productId,
      });

      if (!isValid)
        throw internalErrMsg('Invalid variant', HttpStatus.BAD_REQUEST);

      const newImages: VariantImage[] = [];

      images.forEach((image) => {
        let newImage = new VariantImage();
        newImage = { ...newImage, ...image };
        newImage.variantId = variantId;
        newImages.push(newImage);
      });

      const insertedImages = await this.variantImageRepository.save(newImages);

      return insertedImages;
    } catch (error) {
      throwError(error);
    }
  }

  async getImagesByVariantId(
    productId: string,
    variantId: string,
  ): Promise<VariantImage[]> {
    try {
      const {
        isValid,
        variants: [correspondingVariant],
      } = await this.validateVariantsAndReturn(
        {
          id: variantId,
          productId,
        },
        {
          relations: ['images'],
        },
      );

      if (!isValid)
        throw internalErrMsg('Invalid variant id', HttpStatus.BAD_REQUEST);

      return correspondingVariant.images;
    } catch (error) {
      throwError(error);
    }
  }

  async deleteVariantImageById(
    productId: string,
    variantId: string,
    imageId: string,
  ): Promise<void> {
    try {
      const {
        isValid,
        variants: [correspondingVariant],
      } = await this.validateVariantsAndReturn({
        id: variantId,
        productId,
      });

      if (!isValid)
        throw internalErrMsg('Invalid variant', HttpStatus.BAD_REQUEST);

      const imageToDelete = correspondingVariant.images.find(
        (image) => image.id === imageId,
      );

      if (_isEmpty(imageToDelete))
        throw internalErrMsg(
          'No such image is present in the corresponding variant',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.variantImageRepository.delete({
        id: imageId,
        variantId,
      });

      if (affected < 1) throw internalErrMsg();
    } catch (error) {
      throwError(error);
    }
  }

  async getVariantWithValue(
    productId: string,
    subCatOptionId: string,
    values: string[],
  ): Promise<Variant[]> {
    try {
      const relevantVariants = await this.variantRepository
        .createQueryBuilder('variant')
        .innerJoinAndSelect('variant.options', 'variantOption')
        .where('variant.productId = :productId', { productId })
        .andWhere('variantOption.subCatOptionId = :subCatOptionId', {
          subCatOptionId,
        })
        .andWhere('variantOption.value In (:...values)', { values })
        .getMany();

      return relevantVariants;
    } catch (error) {
      throwError(error);
    }
  }

  async validateVariantsAndReturn(
    conditionObj: objType<any>,
    options?: { relations: string[] },
  ): Promise<ValidateVariantsAndReturnInterface> {
    try {
      const input: {
        where: objType<any>;
        relations?: string[];
      } = {
        where: conditionObj,
      };

      if (!_isEmpty(options?.relations)) input.relations = options.relations;

      const variants: Variant[] = await this.variantRepository.find(input);

      return { isValid: !_isEmpty(variants), variants };
    } catch (error) {
      throwError(error);
    }
  }

  async validateSingleVariantAndReturn(
    conditionObj: objType<any>,
    options?: { relations: string[] },
  ): Promise<any> {
    try {
      const input: {
        where: objType<any>;
        relations?: string[];
      } = {
        where: conditionObj,
      };

      if (!_isEmpty(options?.relations)) input.relations = options.relations;

      const variants = await this.variantRepository.findOne(input);
      return variants;
    } catch (error) {
      throwError(error);
    }
  }

}
