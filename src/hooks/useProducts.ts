import { useRecoilState } from 'recoil';
import { api } from '../api';
import { productsAtom } from '../recoil/atoms/ProductsAtom';
import { Product } from '../types/Product';

interface FetchProps {
  page?: number;
}

export function useProducts() {
  const [products, setProducts] = useRecoilState(productsAtom);

  const fetch = async ({ page = 1 }: FetchProps = {}) => {
    api
      .get<{ items: Product[] }>(`/admin/product?limit=10&page=${page}`)
      .then(({ data }) => setProducts(data.items));
  };

  return { fetch, products, setProducts };
}
