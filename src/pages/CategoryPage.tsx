import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { api } from '../api';
// import { FilterArea } from '../components/FilterArea';
import { GridProduct } from '../components/GridProduct';
import BaseLayout from '../layouts/BaseLayout';
import { filterAtom } from '../recoil/atoms/FilterAtom';
import { Product } from '../types/Product';

export function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>();
  const filter = useRecoilValue(filterAtom);

  useEffect(() => {
    if (filter.location && filter.location.id !== -1) {
      api
        .get(`productByLocation`, {
          params: {
            locationId: filter.location?.id,
            categoryId: filter.category?.id,
          },
        })
        .then(({ data }) => setProducts(data));
    } else {
      api.get(`/productByCategory/${id}`).then(({ data }) => setProducts(data));
    }
  }, [filter.category?.id, filter.location, id]);

  return (
    <BaseLayout>
      <div className="container flex gap-2 mt-4 mb-8 overflow-hidden h-52">
        <img src="https://cdn.tgdd.vn/2022/07/banner/18-s22-800-200-800x200.png" />
        <div className="flex flex-col justify-between gap-2">
          <img src="https://cdn.tgdd.vn/2022/07/banner/390-97-390x97-3.png" />
          <img src="https://cdn.tgdd.vn/2022/07/banner/390-97-390x97-1.png" />
        </div>
      </div>

      {/* <FilterArea /> */}

      <Typography.Title className="container">
        Danh mục {filter.category?.name}
      </Typography.Title>
      <GridProduct products={products} />
    </BaseLayout>
  );
}
