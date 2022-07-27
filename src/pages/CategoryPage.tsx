import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Loading } from '../components/Loading';
import { ProductCard } from '../components/ProductCard';
import BaseLayout from '../layouts/BaseLayout';
import { Product } from '../types/Product';

export function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    api.get(`/productByCategory/${id}`).then(({ data }) => setProducts(data));
  }, [id]);

  return (
    <BaseLayout>
      <div className="container flex gap-2 mt-4 h-52">
        <img src="https://cdn.tgdd.vn/2022/07/banner/18-s22-800-200-800x200.png" />
        <div className="flex flex-col justify-between gap-2">
          <img src="https://cdn.tgdd.vn/2022/07/banner/390-97-390x97-3.png" />
          <img src="https://cdn.tgdd.vn/2022/07/banner/390-97-390x97-1.png" />
        </div>
      </div>
      {products ? (
        <div className="container grid grid-cols-5 gap-4 pt-10">
          {products.map(p => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </BaseLayout>
  );
}
