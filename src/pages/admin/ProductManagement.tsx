import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { api } from '../../api';
import { ProductCard } from '../../components/ProductCard';
import { UpsertProduct } from '../../components/UpsertProduct';
import AdminLayout from '../../layouts/AdminLayout';
import { productsAtom } from '../../recoil/atoms/ProductsAtom';
import { Product } from '../../types/Product';

export default function ProductManagement() {
  const [showUpsert, setShowUpsert] = useState(false);
  const [product, setProduct] = useState<Product>();

  const [products, setProducts] = useRecoilState(productsAtom);

  useEffect(() => {
    api
      .get('/product')
      .then(({ data }) => setProducts(data))
      .catch(err => {
        throw new Error(err);
      });
  }, [setProducts]);

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-end mb-6">
          <Button type="primary" onClick={() => setShowUpsert(!showUpsert)}>
            {showUpsert ? <MinusOutlined /> : <PlusOutlined />}
            Add Product
          </Button>
        </div>

        {showUpsert && (
          <UpsertProduct
            product={product}
            onUpserted={() => {
              setProduct(undefined);
              setShowUpsert(false);
            }}
          />
        )}

        <div className="grid grid-cols-3 gap-4">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
