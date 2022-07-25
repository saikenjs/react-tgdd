import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { Loading } from '../../components/Loading';
import { ProductCard } from '../../components/ProductCard';
import { UpsertProduct } from '../../components/UpsertProduct';
import { useProducts } from '../../hooks/useProducts';
import AdminLayout from '../../layouts/AdminLayout';
import { Product } from '../../types/Product';

export default function ProductManagement() {
  const [showUpsert, setShowUpsert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>();

  const { fetch, products } = useProducts();

  useEffect(() => {
    fetch();
  }, []);

  const onDelete = async (id: number) => {
    setLoading(true);
    await api.put(`/deleteProduct/${id}`);
    await fetch();
    setLoading(false);
  };

  if (loading) return <Loading />;

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
              fetch();
            }}
          />
        )}

        <div className="grid grid-cols-5 gap-4">
          {products.map((product, idx) => (
            <div key={idx} className="flex flex-col shadow">
              <ProductCard product={product} />
              <div className="flex justify-around p-4">
                <Button
                  onClick={() => {
                    setProduct(product);
                    setShowUpsert(true);
                  }}
                >
                  Update
                </Button>
                <Button onClick={() => onDelete(product.productId)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
