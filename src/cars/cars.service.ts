import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './index';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((item) => item.id === id);
    if (!car) throw new NotFoundException(`id ${id} not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = { ...createCarDto, id: uuid() };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let updatedCar = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        updatedCar = {
          ...updatedCar,
          ...updateCarDto,
          id,
        };
        return updatedCar;
      }
      return car;
    });
    return updatedCar;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    if (car) {
      this.cars = this.cars.filter((car) => car.id !== id);
    }
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
