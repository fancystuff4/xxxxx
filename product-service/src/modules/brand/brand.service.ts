import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Brand, BrandLogo } from 'src/database/entities';
import {
  BrandDto,
  BrandLogoCreateDto,
  BrandLogoUpdateDto,
  UpdateBrandDto,
} from './dto';
import { internalErrMsg, throwError, _isEmpty } from 'src/helpers/methods';
import { objType, ValidateInterface } from 'src/helpers/constants';

interface ValidateBrandsAndReturnInterface extends ValidateInterface {
  brands: Brand[];
}

interface ValidateBrandLogosAndReturnInterface extends ValidateInterface {
  logos: BrandLogo[];
}

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(BrandLogo)
    private brandLogoRepository: Repository<BrandLogo>,
  ) {}
  async createBrand(brand: BrandDto): Promise<Brand> {
    const { name, active } = brand;

    const brandToCreate = new Brand();
    brandToCreate.name = name;
    brandToCreate.active = active;

    try {
      const newBrand = await this.brandRepository.save(brandToCreate);

      return newBrand;
    } catch (error) {
      throwError(error, { message: 'A brand with this name already exists' });
    }
  }

  async getOneBrand(brandId: string): Promise<Brand> {
    try {
      const brand = await this.brandRepository.findOne({
        where: { id: brandId },
        relations: ['logos'],
      });

      return brand;
    } catch (error) {
      throwError(error, { message: 'A brand with this name already exists' });
    }
  }

  async getBrands(limit: number, offset: number): Promise<Brand[]> {
    const limitIsValidNumber = !isNaN(limit);
    const offsetIsValidNumber = !isNaN(offset);

    const params: {
      take?: number;
      skip?: number;
      order: objType<string>;
    } = {
      order: {
        name: 'ASC',
      },
    };

    if (limitIsValidNumber) params.take = limit;
    if (!limitIsValidNumber && offsetIsValidNumber)
      throw new BadRequestException(['Offset is not allowed without limit']);

    if (offsetIsValidNumber) params.skip = offset;

    try {
      const brands = await this.brandRepository.find(params);

      return brands;
    } catch (error) {
      throwError(error, { message: 'A brand with this name already exists' });
    }
  }

  async updateOneBrand(brandId: string, body: UpdateBrandDto): Promise<Brand> {
    let totalAffectedRows: number;

    try {
      if (_isEmpty(body))
        throw internalErrMsg(
          'Provide atleast one valid property to update',
          HttpStatus.BAD_REQUEST,
        );

      const updateResult: UpdateResult = await this.brandRepository.update(
        {
          id: brandId,
        },
        { ...body },
      );

      totalAffectedRows = updateResult.affected;

      if (totalAffectedRows !== 1)
        throw internalErrMsg('Brand is not found', HttpStatus.BAD_REQUEST);

      const updatedBrand: Brand = await this.brandRepository.findOne({
        id: brandId,
      });

      return updatedBrand;
    } catch (error) {
      throwError(error, { message: 'A brand with this name already exists' });
    }
  }

  updateMultipleBrands() {
    return;
  }

  async toggleActive(brandId: string, active: boolean): Promise<void> {
    try {
      const result: UpdateResult = await this.brandRepository.update(
        { id: brandId },
        { active },
      );

      if (result.affected < 1)
        throw internalErrMsg(
          `No such brand is found to ${active ? 'activate' : 'deactivate'}`,
          HttpStatus.BAD_REQUEST,
        );
    } catch (error) {
      throwError(error);
    }
  }

  async deleteBrands(brandId: string): Promise<void> {
    try {
      const result: DeleteResult = await this.brandRepository.delete({
        id: brandId,
      });

      if (result.affected < 1)
        throw internalErrMsg(
          'Brand is not found to delete',
          HttpStatus.BAD_REQUEST,
        );
    } catch (error) {
      throwError(error);
    }
  }

  // Logo related methods
  async addNewLogo(
    brandId: string,
    logoObj: BrandLogoCreateDto,
  ): Promise<BrandLogo> {
    try {
      const {
        isValid: isValidBrand,
        brands: [correspondingBrand],
      }: ValidateBrandsAndReturnInterface = await this.validateBrandAndReturn({
        id: brandId,
      });

      if (!isValidBrand)
        throw internalErrMsg('Invalid Brand', HttpStatus.BAD_REQUEST);

      const newLogo = new BrandLogo();
      newLogo.src = logoObj.src;
      newLogo.sizeType = logoObj.sizeType;
      newLogo.brandId = correspondingBrand.id;

      const createdLogo: BrandLogo = await this.brandLogoRepository.save(
        newLogo,
      );

      return createdLogo;
    } catch (error) {
      throwError(error, {
        message: 'This brand already has a logo with specified sizeType',
      });
    }
  }

  async getLogos(brandId: string, logoIds?: string[]): Promise<BrandLogo[]> {
    try {
      const input: {
        id: string;
      } = {
        id: brandId,
      };

      const {
        isValid,
        brands: [correspondingBrand],
      } = await this.validateBrandAndReturn(input, { relations: ['logos'] });

      if (!isValid)
        throw internalErrMsg('Brand is not found', HttpStatus.BAD_REQUEST);

      let logosToReturn = correspondingBrand?.logos;
      if (!_isEmpty(logoIds)) {
        logosToReturn = logosToReturn.filter((logo) =>
          logoIds.includes(logo.id),
        );
      }

      return logosToReturn;
    } catch (error) {
      throwError(error);
    }
  }

  async updateLogo(
    brandId: string,
    logoId: string,
    logoObj: BrandLogoUpdateDto,
  ): Promise<BrandLogo> {
    try {
      const { isValid } = await this.validateBrandLogosAndReturn({
        id: logoId,
        brandId,
      });

      if (!isValid)
        throw internalErrMsg('Brand logo is not found', HttpStatus.BAD_REQUEST);

      const updateLogoResult: UpdateResult =
        await this.brandLogoRepository.update(
          {
            id: logoId,
          },
          logoObj,
        );

      if (updateLogoResult.affected < 1)
        throw internalErrMsg(
          'Failed to update the logo',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const updatedLogo = await this.brandLogoRepository.findOne({
        where: { id: logoId },
      });

      return updatedLogo;
    } catch (error) {
      throwError(error);
    }
  }

  async deleteLogo(brandId: string, logoId: string): Promise<void> {
    try {
      const { isValid } = await this.validateBrandLogosAndReturn({
        id: logoId,
        brandId,
      });

      if (!isValid)
        throw internalErrMsg(
          'Brand logo is not found to delete',
          HttpStatus.BAD_REQUEST,
        );

      const deleteResult: DeleteResult = await this.brandLogoRepository.delete({
        id: logoId,
        brandId,
      });

      if (deleteResult.affected < 1)
        throw internalErrMsg(
          'Failed to remove the logo',
          HttpStatus.BAD_REQUEST,
        );
    } catch (error) {
      throwError(error);
    }
  }

  // following function finds a brand with given conditions
  // returns 'isValid' true
  async validateBrandAndReturn(
    conditionObj: objType<any>,
    options?: { relations: string[] },
  ): Promise<ValidateBrandsAndReturnInterface> {
    try {
      const input: {
        where: objType<any>;
        relations?: string[];
      } = {
        where: conditionObj,
      };

      if (!_isEmpty(options?.relations)) input.relations = options.relations;

      const brands: Brand[] = await this.brandRepository.find(input);

      return { isValid: !_isEmpty(brands), brands };
    } catch (error) {
      throwError(error);
    }
  }

  async validateBrandLogosAndReturn(
    conditionObj: objType<any>,
    options?: { relations: string[] },
  ): Promise<ValidateBrandLogosAndReturnInterface> {
    try {
      const input: {
        where: objType<any>;
        relations?: string[];
      } = {
        where: conditionObj,
      };

      if (!_isEmpty(options?.relations)) input.relations = options.relations;

      const logos: BrandLogo[] = await this.brandLogoRepository.find(input);

      return { isValid: !_isEmpty(logos), logos };
    } catch (error) {
      throwError(error);
    }
  }
}
