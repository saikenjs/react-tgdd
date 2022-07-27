import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { api } from '../api';
import { productsAtom } from '../recoil/atoms/ProductsAtom';
import { Product } from '../types/Product';

interface FetchProps {
  page?: number;
}

interface Pagination {
  totalPage: number;
  currentPage: number;
}

export function useProducts() {
  const [products, setProducts] = useRecoilState(productsAtom);

  const [pagination, setPagination] = useState<Pagination>();

  const fetch = async ({ page = 1 }: FetchProps = {}) => {
    api
      .get<{ items: Product[] } & Pagination>(
        `/admin/product?limit=10&page=${page}`,
      )
      .then(({ data }) => {
        setProducts(data.items);
        setPagination({
          totalPage: data.totalPage,
          currentPage: data.currentPage,
        });
      });
  };

  return { fetch, products, setProducts, pagination };
}
