import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

import { v4 as uuid } from 'uuid';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    { id: uuid(), name: 'Toyota', createdAt: new Date().getTime() },
  ];
  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let updatedBrand = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        updatedBrand = {
          ...updatedBrand,
          ...updateBrandDto,
          id,
        };
        return updatedBrand;
      }
      return brand;
    });
    return updatedBrand;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    if (brand) {
      this.brands = this.brands.filter((brand) => brand.id !== id);
    }
  }
}
