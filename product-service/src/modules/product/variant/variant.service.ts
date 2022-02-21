import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant, VariantImage, VariantOption } from 'src/database/entities';
import { throwError } from 'src/helpers/methods';
import { Repository } from 'typeorm';
import { VariantAndOptionCreateDto } from '../dto';

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

  async createVariants(
    productId: string,
    variantsObjArray: VariantAndOptionCreateDto[],
  ) {
    try {
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

      await this.variantRepository.save(newVariantsArray);
      await this.variantOptRepository.save(optionsArray);
    } catch (error) {
      throwError(error);
    }
  }
}
