import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Brand } from 'src/database/entities';
import { BrandDto, UpdateBrandDto } from './dto';
import { internalErrMsg, throwError, _isEmpty } from 'src/helpers/methods';
import { objType } from 'src/helpers/constants';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
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
      throwError(error, { field: 'Brand' });
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
      throwError(error, { field: 'Brand' });
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
      throwError(error, { field: 'Brand' });
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
      throwError(error, { field: 'Brand' });
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
}
