import { Product } from './types';

export const products: Product[] = [
  // Lightsabers
  {
    id: 1,
    name: 'Световой меч Дарт Вейдера',
    category: 'lightsabers',
    price: 15000,
    image: '🔴',
    stock: 5,
    popularity: 95
  },
  {
    id: 2,
    name: 'Световой меч Люка Скайвокера',
    category: 'lightsabers',
    price: 12000,
    image: '🟢',
    stock: 12,
    popularity: 90
  },
  {
    id: 3,
    name: 'Световой меч Мейс Винду',
    category: 'lightsabers',
    price: 14000,
    image: '🔵',
    stock: 3,
    popularity: 75
  },
  {
    id: 4,
    name: 'Световой меч Кайло Рена',
    category: 'lightsabers',
    price: 16000,
    image: '🔴',
    stock: 8,
    popularity: 85
  },
  // Clothing
  {
    id: 5,
    name: 'Футболка "Эмблема Альянса"',
    category: 'clothing',
    price: 2500,
    image: '👕',
    stock: 45,
    popularity: 80
  },
  {
    id: 6,
    name: 'Худи "Империя"',
    category: 'clothing',
    price: 4500,
    image: '🧥',
    stock: 20,
    popularity: 70
  },
  {
    id: 7,
    name: 'Футболка "Дарт Вейдер"',
    category: 'clothing',
    price: 2800,
    image: '👕',
    stock: 60,
    popularity: 92
  },
  {
    id: 8,
    name: 'Куртка "Пилот X-Wing"',
    category: 'clothing',
    price: 8000,
    image: '🧥',
    stock: 7,
    popularity: 65
  },
  // Merch
  {
    id: 9,
    name: 'Статуэтка R2-D2',
    category: 'merch',
    price: 5500,
    image: '🤖',
    stock: 15,
    popularity: 88
  },
  {
    id: 10,
    name: 'Фигурка Бобы Фетта',
    category: 'merch',
    price: 4200,
    image: '🎭',
    stock: 10,
    popularity: 82
  },
  {
    id: 11,
    name: 'Брелок "Молот Галактики"',
    category: 'merch',
    price: 800,
    image: '🔑',
    stock: 100,
    popularity: 60
  },
  {
    id: 12,
    name: 'Маска Дарт Вейдера',
    category: 'merch',
    price: 3500,
    image: '🎭',
    stock: 25,
    popularity: 78
  },
  {
    id: 13,
    name: 'Набор значков "Звёздные войны"',
    category: 'merch',
    price: 1200,
    image: '🏅',
    stock: 50,
    popularity: 55
  },
  {
    id: 14,
    name: 'Зонт "Звезда Смерти"',
    category: 'merch',
    price: 1800,
    image: '☂️',
    stock: 30,
    popularity: 72
  },
  {
    id: 15,
    name: 'Термокружка "Люк Скайвокер"',
    category: 'merch',
    price: 950,
    image: '☕',
    stock: 40,
    popularity: 68
  },
  {
    id: 16,
    name: 'Рюкзак "Флотан"',
    category: 'merch',
    price: 6500,
    image: '🎒',
    stock: 6,
    popularity: 50
  }
];

export const categoryNames: Record<string, string> = {
  lightsabers: 'Световые мечи',
  clothing: 'Одежда',
  merch: 'Мерч'
};
