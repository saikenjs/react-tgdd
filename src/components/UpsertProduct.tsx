/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Form, Input, Switch } from 'antd';
import { useState } from 'react';
import { api } from '../api';
import { Product } from '../types/Product';
import { CategorySelector } from './selector/CategorySelector';
import { ManufacturerSelector } from './selector/ManufacturerSelector';
import { StoreSelector } from './selector/StoreSelector';

interface Props {
  product?: Product;
  onUpserted?: (product: Product) => void;
}

export function UpsertProduct({ product, onUpserted }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  form.setFieldsValue(product);

  return (
    <Form
      form={form}
      disabled={loading}
      labelCol={{ xs: 4 }}
      initialValues={product}
      onFinish={async values => {
        setLoading(true);
        if (product?.productId) {
          await api
            .put(`/product/${product.productId}`, { ...values, rate: 5 })
            .then(({ data }) => onUpserted?.(data));
        } else {
          await api
            .post('/product', { ...values, rate: 5 })
            .then(({ data }) => onUpserted?.(data));
        }
        setLoading(false);
      }}
    >
      <Form.Item label="Name" name="productName" required>
        <Input placeholder="Ex: Iphone 14" />
      </Form.Item>

      <Form.Item label="Description" name="description" required>
        <Input.TextArea
          autoSize={{ minRows: 2 }}
          placeholder="Ex: This is perfect phone in the world, :penguin:"
        />
      </Form.Item>

      <Form.Item label="Price" name="unitPrice" required>
        <Input type="number" suffix="VNĐ" className="w-80" />
      </Form.Item>
      <Form.Item label="Discount" name="salePrice" required>
        <Input type="number" suffix="%" className="w-80" />
      </Form.Item>

      <Form.Item label="Status" name="status" valuePropName="checked">
        <Switch checkedChildren="Yes" unCheckedChildren="No" />
      </Form.Item>

      <Form.Item label="Quantity" name="quantity">
        <Input type="number" suffix="Sản phẩm" />
      </Form.Item>

      <Form.Item label="Images" name="image" required>
        <Input placeholder="Enter url" />
      </Form.Item>
      {/* <Form.Item label="Images" name="images" valuePropName="fileList">
        <Upload
          listType="picture-card"
          maxCount={1}
          customRequest={({ file, onSuccess, onError }) => {
            axios.post(
              'https://api.imgur.com/3/image',
              { image: file },
              { headers: { Authorization: 'Client-ID a7ed3f5c19df807' } },
            );
          }}
        >
          <PlusOutlined />
        </Upload>
      </Form.Item> */}

      <Form.Item
        label="Category"
        name="categoryId"
        wrapperCol={{ xs: 4 }}
        required
      >
        <CategorySelector />
      </Form.Item>

      <Form.Item
        label="Manufacturer"
        name="manufacturerId"
        wrapperCol={{ xs: 4 }}
        required
      >
        <ManufacturerSelector />
      </Form.Item>

      <Form.Item label="Store" name="storeId" wrapperCol={{ xs: 4 }} required>
        <StoreSelector />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="block mx-auto">
        {product?.productId ? 'Update Product' : 'Add Product'}
      </Button>
    </Form>
  );
}
