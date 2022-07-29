import {
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Pagination, Typography } from 'antd';
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

  const [filter, setFilter] = useState('');

  const { fetch, products } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch({ limit: 99999999 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (id: number) => {
    setLoading(true);
    await api.put(`/admin/deleteProduct/${id}`);
    await fetch({ limit: 999999999 });
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between">
          <Typography.Title>Produc Management</Typography.Title>
          <Button
            className="bg-green-500 border-none rounded-lg"
            type="primary"
            onClick={() => setShowUpsert(!showUpsert)}
          >
            {showUpsert ? <MinusOutlined /> : <PlusOutlined />}
            Add Product
          </Button>
        </div>

        <div className="flex justify-end mb-8">
          <Input
            className="w-1/3 rounded"
            size="large"
            suffix={<SearchOutlined />}
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
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
              fetch({ limit: 99999999 });
            }}
          />
        </Modal>

        <div className="grid grid-cols-5 gap-8">
          {products
            .slice((currentPage - 1) * 20, currentPage * 20)
            .filter(e =>
              e.productName.toLowerCase().includes(filter.toLowerCase()),
            )
            .map((product, idx) => (
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
          current={currentPage}
          total={products.length}
          pageSize={20}
          showSizeChanger={false}
          onChange={page => {
            setCurrentPage(page);
          }}
        />
      </div>
    </AdminLayout>
  );
}
