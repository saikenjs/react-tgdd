/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, Input, message, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../api';
import { Product } from '../types/Product';
import { CategorySelector } from './selector/CategorySelector';
import { ManufacturerSelector } from './selector/ManufacturerSelector';
import { StoreSelector } from './selector/StoreSelector';
import { UploadImage } from './UploadImage';

interface Props {
  product?: Product;
  onUpserted?: (product: Product) => void;
}

export function UpsertProduct({ product, onUpserted }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    product ? form.setFieldsValue(product) : form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Form
      className="pt-12"
      form={form}
      disabled={loading}
      labelCol={{ span: 6 }}
      initialValues={product}
      onFinish={async values => {
        setLoading(true);
        if (product?.productId) {
          await api
            .put(`/admin/product/${product.productId}`, {
              ...values,
              rate: 4.5,
            })
            .then(({ data }) => {
              onUpserted?.(data);
              form.resetFields();
            });
        } else {
          await api
            .post('/admin/product', {
              ...values,
              rate: 5,
            })
            .then(({ data }) => {
              onUpserted?.(data);
              form.resetFields();
            })
            .catch(err => message.error(err.message));
        }
        setLoading(false);
      }}
    >
      <Form.Item
        label="Name"
        name="productName"
        rules={[{ required: true }, { min: 5 }]}
      >
        <Input placeholder="Ex: Iphone 14" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ min: 20 }, { required: true }]}
      >
        <Input.TextArea
          autoSize={{ minRows: 2 }}
          placeholder="Ex: This is perfect phone in the world, :penguin:"
        />
      </Form.Item>

      <Form.Item label="Price" name="unitPrice" rules={[{ required: true }]}>
        <Input type="number" suffix="VNĐ" className="w-80" />
      </Form.Item>
      <Form.Item
        label="Sale Price"
        name="salePrice"
        rules={[{ required: true }]}
      >
        <Input type="number" suffix="VND" className="w-80" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch checkedChildren="Yes" unCheckedChildren="No" />
      </Form.Item>

      <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
        <Input type="number" suffix="Sản phẩm" />
      </Form.Item>

      <Form.Item label="Image" name="image" rules={[{ required: true }]}>
        <UploadImage />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true }]}
      >
        <CategorySelector />
      </Form.Item>

      <Form.Item
        label="Manufacturer"
        name="manufacturerId"
        rules={[{ required: true }]}
      >
        <ManufacturerSelector />
      </Form.Item>

      <Form.Item label="Store" name="storeId" rules={[{ required: true }]}>
        <StoreSelector />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="block mx-auto">
        {product?.productId ? 'Update Product' : 'Add Product'}
      </Button>
    </Form>
  );
}
