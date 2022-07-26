/* eslint-disable @typescript-eslint/naming-convention */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    form.setFieldsValue(product);
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
              image: values.image.file.response.data.display_url,
            })
            .then(({ data }) => onUpserted?.(data));
        } else {
          await api
            .post('/admin/product', {
              ...values,
              rate: 5,
              image: values.image.file.response.data.display_url,
            })
            .then(({ data }) => onUpserted?.(data))
            .catch(err => message.error(err.message));
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

      <Form.Item label="Image" name="image" required>
        <Upload
          listType="picture-card"
          maxCount={1}
          action="https://api.imgbb.com/1/upload"
          data={{ key: 'd0abe88065f9d724e5d8649eb5aed35c' }}
          name="image"
        >
          <PlusOutlined />
        </Upload>
      </Form.Item>

      <Form.Item label="Category" name="categoryId" required>
        <CategorySelector />
      </Form.Item>

      <Form.Item label="Manufacturer" name="manufacturerId" required>
        <ManufacturerSelector />
      </Form.Item>

      <Form.Item label="Store" name="storeId" required>
        <StoreSelector />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="block mx-auto">
        {product?.productId ? 'Update Product' : 'Add Product'}
      </Button>
    </Form>
  );
}
