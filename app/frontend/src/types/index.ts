import type { Datetime } from '@/utils/time';

type User = {
  id: string;
  name: string;
  time: Datetime;
  fee: number;
  isNomihodai: boolean;
  status: boolean;
};

type ProductCategory = 'drink' | 'chip' | 'plan';

type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
};

export type { User, Product, ProductCategory };
