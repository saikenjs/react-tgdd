import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Pagination } from 'antd';
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

  const { fetch, products, pagination } = useProducts();

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (id: number) => {
    setLoading(true);
    await api.put(`/admin/deleteProduct/${id}`);
    await fetch();
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-end mb-6">
          <Button
            className="bg-green-500 border-none rounded-lg"
            type="primary"
            onClick={() => setShowUpsert(!showUpsert)}
          >
            {showUpsert ? <MinusOutlined /> : <PlusOutlined />}
            Add Product
          </Button>
        </div>

        <Modal
          visible={showUpsert}
          footer={null}
          closeIcon={
            <CloseOutlined
              onClick={() => {
                setShowUpsert(false);
                setProduct(undefined);
              }}
            />
          }
        >
          <UpsertProduct
            product={product}
            onUpserted={() => {
              setProduct(undefined);
              setShowUpsert(false);
              fetch();
            }}
          />
        </Modal>

        <div className="grid grid-cols-5 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-md shadow-2xl"
            >
              <ProductCard disabled product={product} />
              <div className="flex justify-around p-4">
                <Button
                  className="text-white border-none rounded-lg bg-amber-500"
                  onClick={() => {
                    setProduct(product);
                    setShowUpsert(true);
                  }}
                >
                  Update
                </Button>
                <Button
                  className="text-white bg-red-500 border-none rounded-lg"
                  onClick={() => onDelete(product.productId)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          className="flex justify-end ml-auto mt-7"
          current={pagination?.currentPage}
          total={(pagination?.totalPage ?? 1) * 10}
          onChange={page => {
            fetch({ page });
          }}
        />
      </div>
    </AdminLayout>
  );
}
