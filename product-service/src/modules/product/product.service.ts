import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductImage, ProductOption } from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import {
  objType,
  paginationOrIds,
  ValidateInterface,
} from 'src/helpers/constants';
import {
  createCombinationOfElements,
  ensureNoOffsetWithoutLimit,
  throwError,
  _isEmpty,
} from 'src/helpers/methods';
import { In, Repository } from 'typeorm';
import { ProductAndOptionCreateDto } from './dto';
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
  ) {}

  // create product
  async createProduct(
    subCategoryId: string,
    body: ProductAndOptionCreateDto,
  ): Promise<Product> {
    try {
      let newProduct = new Product();
      const { options, ...productAttributes } = body;

      newProduct = { ...newProduct, ...productAttributes, subCategoryId };

      const insertedProduct = await this.productRepository.save(newProduct);

      const productOptions: ProductOption[] = [];
      const valueAndOptionIds: { subCatOptionId: string; value: any }[][] = [];

      options.forEach((option) => {
        let newOption = new ProductOption();
        newOption = { ...newOption, ...option, productId: insertedProduct.id };

        productOptions.push(newOption);

        // make an array of the form
        // [ array for each options-type ]

        const valueAndOptId = option.availableValues.map((value) => ({
          value,
          subCatOptionId: option.subCatOptionId,
        }));

        valueAndOptionIds.push(valueAndOptId);
      });

      const combinations = createCombinationOfElements(valueAndOptionIds);

      const variantsObj = combinations.map((options) => ({
        name: options.reduce((a, c) => a + c.value + '/ ', ''),
        productId: insertedProduct.id,
        active: true,
        price: 0,
        options,
      }));

      // the following two can be done simultaneously
      await this.variantService.createVariants(insertedProduct.id, variantsObj);

      await this.productOptionRepository.save(productOptions);

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
      console.log(error);

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
          relations: ['options', 'variants', 'variants.options'],
        },
      );

      return products;
    } catch (error) {
      throwError(error);
    }
  }
  // get products by pagination
  // update product
  // toggle product active status
  // delete product

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
}
