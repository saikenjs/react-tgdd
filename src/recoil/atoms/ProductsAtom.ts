import { atom } from 'recoil';
import { Product } from '../../types/Product';

export const productsAtom = atom<Product[]>({
  key: 'products',
  default: [],
});
