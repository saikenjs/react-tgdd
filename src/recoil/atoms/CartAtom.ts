import { atom } from 'recoil';
import { Product } from '../../types/Product';

interface CartItem {
  product: Product;
  amount: number;
}

export const cartAtom = atom<CartItem[]>({
  key: 'cart',
  default: [],
});
