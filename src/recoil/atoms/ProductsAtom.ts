import { atom } from 'recoil';
import { Product } from '#/src/types/Product';

export const productsAtom = atom<Product[]>({
  key: 'products',
  default: [],
});
