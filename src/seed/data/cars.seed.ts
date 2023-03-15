import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Ford',
    model: 'Ka',
  },
  {
    id: uuid(),
    brand: 'Ford',
    model: 'Explorer',
  },
  {
    id: uuid(),
    brand: 'Opel',
    model: 'Astra',
  },
  {
    id: uuid(),
    brand: 'Peogeut',
    model: '407',
  },
];
