import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { api } from '../api';
import { GridProduct } from '../components/GridProduct';
import BaseLayout from '../layouts/BaseLayout';
import { filterAtom } from '../recoil/atoms/FilterAtom';
import { Product } from '../types/Product';

export function SearchResultPage() {
  const filter = useRecoilValue(filterAtom);

  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    api.get(`/search/${filter.query}`).then(({ data }) => setProducts(data));
  }, [filter.query]);

  return (
    <BaseLayout>
      <div className="container py-6">
        <Typography.Title>
          Kết quả tìm kiếm cho &quot;{filter.query}&quot;
        </Typography.Title>
        <GridProduct products={products} />
      </div>
    </BaseLayout>
  );
}
