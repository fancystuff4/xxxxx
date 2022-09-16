// TO_DO PRODUCT UPDATE //
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import {
  Product,
  ProductImage,
  ProductOption,
  Variant,
  VariantOption,
} from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import {
  objType,
  OPTION_ACTION_TYPES,
  paginationOrIds,
  ValidateInterface,
} from 'src/helpers/constants';
import {
  createCombinationOfElements,
  ensureNoOffsetWithoutLimit,
  internalErrMsg,
  throwError,
  _isEmpty,
} from 'src/helpers/methods';
import {
  Connection,
  DeleteResult,
  In,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  ProductCreateDto,
  ProductOptionCreateObj,
  ProductOptionUpdateDto,
  ProductImageCreateObj,
} from './dto';
import { VariantService } from './variant/variant.service';

interface validateProductsAndReturnInterface extends ValidateInterface {
  products: Product[];
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
    private variantService: VariantService,
    @InjectConnection() private connection: Connection,
  ) {}

  // create product
  async createProduct(
    subCategoryId: string,
    body: ProductCreateDto,
  ): Promise<Product> {
    try {
      let newProduct = new Product();
      const { ...productAttributes } = body;

      newProduct = { ...newProduct, ...productAttributes, subCategoryId };

      const insertedProduct = await this.productRepository.save(newProduct);

      // const productOptions: ProductOption[] = [];
      // const valueAndOptionIds: { subCatOptionId: string; value: any }[][] = [];

      // options.forEach((option) => {
      //   let newOption = new ProductOption();
      //   newOption = { ...newOption, ...option, productId: insertedProduct.id };

      //   productOptions.push(newOption);

      //   // make an array of the form
      //   // [ array for each options-type ]

      //   const valueAndOptId = option.availableValues.map((value) => ({
      //     value,
      //     subCatOptionId: option.subCatOptionId,
      //   }));

      //   valueAndOptionIds.push(valueAndOptId);
      // });

      // const combinations = createCombinationOfElements(valueAndOptionIds);

      // const variantsObj = combinations.map((options) => ({
      //   name: options.reduce((a, c) => a + c.value + '/ ', ''),
      //   productId: insertedProduct.id,
      //   active: true,
      //   price: 0,
      //   options,
      // }));

      // the following two can be done simultaneously
      // await this.variantService.createVariants(insertedProduct.id, variantsObj);

      // await this.productOptionRepository.save(productOptions);

      const productWithOptions = await this.productRepository.findOne({
        where: { id: insertedProduct.id },
        relations: [
          'options',
          'variants',
          'variants.options',
          'variants.options.subCatOption',
        ],
      });

      return productWithOptions;
    } catch (error) {
      throwError(error);
    }
  }
  // get products by filtering ids
  async getProductsByIds(
    subCategoryId: string,
    productIds: string[],
  ): Promise<Product[]> {
    try {
      const { products } = await this.validateProductsAndReturn(
        {
          subCategoryId,
          id: In(productIds),
        },
        {
          relations: [
            'options',
            'options.subCatOption',
            'images',
            'variants',
            'variants.images',
            'variants.options',
            'variants.options.subCatOption',
          ],
        },
      );

      return products;
    } catch (error) {
      throwError(error);
    }
  }

  // get products by pagination or filtering ids
  async getProducts(
    subCategoryId: string,
    queryConditions: PaginationDto,
  ): Promise<Product[]> {
    const limit = queryConditions.limit;
    const offset = queryConditions.offset;

    const productIds = queryConditions.ids;

    let condition: paginationOrIds;
    let products: Product[];

    try {
      if (productIds) {
        condition = { id: In(productIds) };

        products = await this.productRepository.find({
          where: { ...condition, subCategoryId },
          relations: [
            'subCategory',
            'options',
            'images',
            'variants',
            'variants.options',
          ],
        });
      } else {
        ensureNoOffsetWithoutLimit(limit, offset);

        condition = {
          take: limit,
          skip: offset,
          order: {
            name: 'ASC',
          },
          relations: [
            'subCategory',
            'options',
            'options.subCatOption',
            'images',
            'variants',
            'variants.options',
          ],
        };

        products = await this.productRepository.find(condition);
      }

      return products;
    } catch (error) {
      throwError(error);
    }
  }

  // add/ remove value to/ from existing product option
  async addOrRemoveValueFromProductOption(
    subCategoryId: string,
    productId: string,
    inputObj: ProductOptionUpdateDto,
    product: Product,
  ): Promise<Product> {
    const { actionType, values, subCatOptionId } = inputObj;
    try {
      if (actionType === OPTION_ACTION_TYPES.ADD) {
        // find product options which does not have the provided sub-category option id
        // create variants by mixing the new values with the option values
        // found in last step

        const correspondingProductOption = product.options.find(
          (option) => option.subCatOptionId === subCatOptionId,
        );

        if (_isEmpty(correspondingProductOption))
          throw internalErrMsg(
            'No such product option is found',
            HttpStatus.BAD_REQUEST,
          );

        const alreadyAvailableValues =
          correspondingProductOption.availableValues;

        const existingValue = alreadyAvailableValues.find((value) =>
          values.includes(value),
        );

        if (!_isEmpty(existingValue))
          throw internalErrMsg(
            `Value ${existingValue} is already present in this product.`,
            HttpStatus.BAD_REQUEST,
          );

        const optionsWithoutTheSubCatOption = product.options.filter(
          (option) => option.subCatOptionId !== subCatOptionId,
        );

        const { newVariantsArray, optionsArray } =
          this.getVariantAndOptionsArrays(
            optionsWithoutTheSubCatOption,
            values,
            { subCatOptionId, productId },
          );

        await this.connection.transaction(async (entityManager) => {
          const createVariantPromise = entityManager.save(
            Variant,
            newVariantsArray,
          );

          const addToProductOptPromise = entityManager.update(
            ProductOption,
            {
              productId,
              subCatOptionId,
            },
            {
              availableValues: [...alreadyAvailableValues, ...values],
            },
          );

          // create variant using entity manager
          const createVariantOptPromise = entityManager.save(
            VariantOption,
            optionsArray,
          );

          await Promise.all([
            addToProductOptPromise,
            createVariantPromise,
            createVariantOptPromise,
          ]);
        });

        const updatedProduct = await this.productRepository.findOne({
          where: { id: productId },
          relations: ['images', 'options', 'variants'],
        });

        return updatedProduct;
      } else if (actionType === OPTION_ACTION_TYPES.REMOVE) {
        // remove variants whose product id is the provided one and has the provided value for the provided sub-cat-option-id

        // remove the value from the options array
        const relevantVariants = await this.variantService.getVariantWithValue(
          productId,
          subCatOptionId,
          values,
        );

        const idsOfVariantsToRemove = relevantVariants.map(
          (variant) => variant.id,
        );

        const alreadyAvailableValues = product.options.find(
          (option) => option.subCatOptionId === subCatOptionId,
        ).availableValues;

        const newAvailableValues = alreadyAvailableValues.filter(
          (value) => !values.includes(value),
        );

        await this.connection.transaction(async (entityManager) => {
          // if newAvailableValues is empty, then remove the whole product option.
          let optionsPromise: Promise<DeleteResult | UpdateResult>;
          if (_isEmpty(newAvailableValues)) {
            optionsPromise = entityManager.delete(ProductOption, {
              productId,
              subCatOptionId,
            });
          } else {
            optionsPromise = entityManager.update(
              ProductOption,
              { productId, subCatOptionId },
              { availableValues: newAvailableValues },
            );
          }

          const deleteVariantsPromise = entityManager.delete(Variant, {
            productId,
            id: In(idsOfVariantsToRemove),
          });

          await Promise.all([optionsPromise, deleteVariantsPromise]);
        });

        const updatedProduct = await this.productRepository.findOne({
          where: {
            id: productId,
          },
          relations: ['options', 'variants'],
        });

        return updatedProduct;
      } else {
        throw internalErrMsg(
          "Invalid 'actionType' value. Only 'ADD' or 'REMOVE' is accepted",
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throwError(error);
    }
  }

  // add product option
  async addProductOption(
    subCategoryId: string,
    productId: string,
    optionObj: ProductOptionCreateObj,
    product: Product,
  ): Promise<Product> {
    // add the first option value to the existing variants,
    // create variants from other options and the remaining incoming values
    try {
      const { subCatOptionId, availableValues, active } = optionObj;

      const { variants } = product;
      const variantOptionsFromFirstValue: VariantOption[] = [];

      variants.forEach((variant) => {
        const newOption = new VariantOption();
        newOption.value = availableValues[0];
        newOption.active = active;
        newOption.subCatOptionId = subCatOptionId;
        newOption.variant = variant;

        variantOptionsFromFirstValue.push(newOption);
      });

      const [_, ...restValues] = availableValues;

      let valuesForNewVariants: string[] = [];

      if (_isEmpty(variants)) {
        valuesForNewVariants = availableValues;
      } else {
        valuesForNewVariants = restValues;
      }

      const { newVariantsArray, optionsArray: variantOptionsFromOtherValues } =
        this.getVariantAndOptionsArrays(product.options, valuesForNewVariants, {
          subCatOptionId,
          productId,
        });

      const newProductOption = new ProductOption();
      newProductOption.availableValues = availableValues;
      newProductOption.productId = productId;
      newProductOption.subCatOptionId = subCatOptionId;
      newProductOption.active = true;

      await this.connection.transaction(async (entityManager) => {
        const nameChangePromiseArray = [];
        product.variants.forEach((variant) => {
          nameChangePromiseArray.push(
            entityManager.update(
              Variant,
              { id: variant.id },
              { name: variant.name + `${availableValues[0]}` },
            ),
          );
        });

        await Promise.all(nameChangePromiseArray);

        const newVariantsPromise = entityManager.save(
          Variant,
          newVariantsArray,
        );
        const newVariantOptionsPromise = entityManager.save(VariantOption, [
          ...variantOptionsFromOtherValues,
          ...variantOptionsFromFirstValue,
        ]);

        const newProductOptionPromise = entityManager.save(
          ProductOption,
          newProductOption,
        );

        await Promise.all([
          newVariantsPromise,
          newVariantOptionsPromise,
          newProductOptionPromise,
        ]);
      });

      const updatedProduct = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['images', 'options', 'variants'],
      });

      return updatedProduct;
    } catch (error) {
      throwError(error);
    }
  }

  async removeProductOption(
    subCategoryId: string,
    productId: string,
    optionId: string,
    product: Product,
  ): Promise<Product> {
    try {
      // removal of product option should be allowed only if one value is
      // present in the product_option
      const { options } = product;

      let correspodingOption: ProductOption;
      const otherOptions: ProductOption[] = [];

      options.forEach((option) => {
        if (option.id === optionId) {
          correspodingOption = option;
          return;
        }
        otherOptions.push(option);
      });

      if (_isEmpty(correspodingOption))
        throw internalErrMsg(
          'No such option is found for the product',
          HttpStatus.BAD_REQUEST,
        );

      if (correspodingOption.availableValues.length > 1)
        throw internalErrMsg(
          'Product option can be deleted only if it has one or less available values',
          HttpStatus.BAD_REQUEST,
        );

      const { variants } = product;
      const variantIds = variants.map((variant) => variant.id);

      // find the variant ids which were having the sub-cat option id and the product id

      await this.connection.transaction(async (entityManager) => {
        // remove the variant_option where subCatOptionId and variant ids that can be got from the product details
        const removeVariantOptionsPromise = entityManager.delete(
          VariantOption,
          {
            subCatOptionId: correspodingOption.subCatOptionId,
            variant: In(variantIds),
          },
        );

        // rename, if other options are available. If not, delete the variants
        const variantPromise: Promise<any>[] = [];

        if (_isEmpty(otherOptions)) {
          // delete
          variantPromise.push(
            entityManager.delete(Variant, {
              id: In(variantIds),
              productId,
            }),
          );
        } else {
          // rename
          variants.forEach((variant) => {
            variantPromise.push(
              entityManager.update(
                Variant,
                {
                  id: variant.id,
                  productId,
                },
                {
                  name: variant.name.replace(
                    correspodingOption.availableValues[0],
                    '',
                  ),
                },
              ),
            );
          });
        }

        // const renameVariants = entityManager.delete(Variant, {
        //   id: In(variantIdsToRemove),
        // });

        // remove the product_option where subCatOptionId is the given one
        const removeProductOptionPromise = entityManager.delete(ProductOption, {
          productId,
          id: optionId,
        });

        await Promise.all([
          removeVariantOptionsPromise,
          ...variantPromise,
          removeProductOptionPromise,
        ]);
      });

      const updatedProduct = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['images', 'variants', 'options'],
      });

      return updatedProduct;
    } catch (error) {
      throwError(error);
    }
  }

  // toggle product active status
  async toggleProductActive(
    subCategoryId: string,
    productId: string,
    active: boolean,
  ): Promise<Product> {
    try {
      const { isValid } = await this.validateProductsAndReturn({
        id: productId,
        subCategoryId,
      });

      if (!isValid)
        throw internalErrMsg('Invalid product', HttpStatus.BAD_REQUEST);

      const { affected } = await this.productRepository.update(
        {
          id: productId,
        },
        {
          active,
        },
      );

      if (affected < 1) throw internalErrMsg();

      const affectedProduct = await this.productRepository.findOne(productId);

      return affectedProduct;
    } catch (error) {
      throwError(error);
    }
  }
  // delete product
  async deleteProduct(subCategoryId: string, productId: string): Promise<void> {
    try {
      const { isValid } = await this.validateProductsAndReturn({
        id: productId,
        subCategoryId,
      });

      if (!isValid)
        throw internalErrMsg(
          'Invalid product. Please check the product and the sub-category id',
          HttpStatus.BAD_REQUEST,
        );

      await this.productRepository.delete({
        id: productId,
        subCategoryId,
      });
    } catch (error) {
      throwError(error);
    }
  }

  ///////////////// PRODUCT IMAGE /////////////////////

  async addProductImages(
    subCategoryId: string,
    productId: string,
    images: ProductImageCreateObj[],
  ): Promise<ProductImage[]> {
    try {
      const { isValid } = await this.validateProductsAndReturn({
        id: productId,
        subCategoryId,
      });

      if (!isValid)
        throw internalErrMsg('Invalid product', HttpStatus.BAD_REQUEST);

      const newImages: ProductImage[] = [];

      images.forEach((image) => {
        let newImage = new ProductImage();
        newImage = { ...newImage, ...image };
        newImage.productId = productId;
        newImages.push(newImage);
      });

      const insertedImages = await this.productImageRepository.save(newImages);

      return insertedImages;
    } catch (error) {
      throwError(error);
    }
  }

  async getImagesByProductId(
    subCategoryId: string,
    productId: string,
  ): Promise<ProductImage[]> {
    try {
      const {
        isValid,
        products: [correspondingProduct],
      } = await this.validateProductsAndReturn(
        {
          id: productId,
          subCategoryId,
        },
        {
          relations: ['images'],
        },
      );

      if (!isValid)
        throw internalErrMsg(
          'Invalid product. Check the product id and the sub-category id.',
          HttpStatus.BAD_REQUEST,
        );

      return correspondingProduct.images;
    } catch (error) {
      throwError(error);
    }
  }

  async getProductImageById(
    subCategoryId: string,
    productId: string,
    imageId: string,
  ): Promise<ProductImage> {
    const images = await this.getImagesByProductId(subCategoryId, productId);

    const requiredImage = images.find((image) => image.id === imageId);

    return requiredImage;
  }

  async deleteProductImageById(
    subCategoryId: string,
    productId: string,
    imageId: string,
  ): Promise<void> {
    const image = await this.getProductImageById(
      subCategoryId,
      productId,
      imageId,
    );

    try {
      if (_isEmpty(image))
        throw internalErrMsg(
          'Invalid image. Please check the image, product and sub-category id',
          HttpStatus.BAD_REQUEST,
        );

      const { affected } = await this.productImageRepository.delete({
        id: imageId,
      });

      if (affected < 1) throw internalErrMsg();
    } catch (error) {
      throwError(error);
    }
  }

  // verify product and return
  async validateProductsAndReturn(
    conditionObj: objType<any>,
    options?: { relations: string[] },
  ): Promise<validateProductsAndReturnInterface> {
    try {
      const input: {
        where: objType<any>;
        relations?: string[];
      } = {
        where: conditionObj,
      };

      if (!_isEmpty(options?.relations)) input.relations = options.relations;

      const products: Product[] = await this.productRepository.find(input);

      return { isValid: !_isEmpty(products), products };
    } catch (error) {
      throwError(error);
    }
  }

  getVariantAndOptionsArrays(
    productOptions: ProductOption[],
    incomingValues: string[],
    ids: { productId: string; subCatOptionId: string },
  ) {
    const valueAndOptionIds: { subCatOptionId: string; value: any }[][] = [];
    const { productId, subCatOptionId } = ids;

    productOptions.forEach((option) => {
      const vidArray = option.availableValues.map((value) => ({
        value,
        subCatOptionId: option.subCatOptionId,
      }));

      valueAndOptionIds.push(vidArray);
    });
    valueAndOptionIds.push(
      incomingValues.map((value) => ({ value, subCatOptionId })),
    );

    const combinations = createCombinationOfElements(valueAndOptionIds);

    const variantsObj = combinations.map((options) => ({
      name: options.reduce((a, c) => a + c.value + '/ ', ''),
      productId: productId,
      active: true,
      price: 0,
      options,
    }));

    const variantsAndOptionsArray =
      this.variantService.getNewVariantAndOptionsArray(productId, variantsObj);

    return variantsAndOptionsArray;
  }
}
