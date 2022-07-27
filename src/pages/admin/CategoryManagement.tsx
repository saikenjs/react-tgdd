import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import AdminLayout from '../../layouts/AdminLayout';
import { Category } from '../../types/Category';

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const fetchCategories = () =>
    api.get<Category[]>('/admin/category').then(({ data }) => {
      setCategories(data);
    });

  const updateCategory = (id: string | number, body: Category) => {
    setLoading(true);
    api
      .put(`/admin/category/${id}`, body)
      .then(_ => message.success('Update successfully!'))
      .catch(_ => message.error('Update failed!'))
      .finally(() => fetchCategories().finally(() => setLoading(false)));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-12">
        <Typography.Title>Category Management</Typography.Title>
        <Button
          className="text-white border-none rounded bg-amber-500"
          onClick={() => setShowModal(true)}
        >
          Add category +
        </Button>
      </div>

      <Modal
        closeIcon={null}
        visible={showModal}
        onOk={() => {
          setLoading(true);
          api
            .post('/admin/category', form.getFieldsValue())
            .then(() => message.success('Create Successfully'))
            .catch(() => message.error('Create failed!'))
            .finally(() => {
              setLoading(false);
              setShowModal(false);
            });
        }}
        onCancel={() => setShowModal(false)}
        okText="Create Category"
      >
        <Form className="pt-10" form={form} disabled={loading}>
          <Form.Item label="Name" name="categoryName" required>
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status" required>
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        loading={loading}
        rowKey={record => record.categoryId}
        columns={[
          { title: 'ID', key: 'id', dataIndex: 'categoryId' },
          { title: 'Name', key: 'name', dataIndex: 'categoryName' },
          {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: status => (
              <Tag color={status ? 'green' : 'red'}>
                {status ? 'Active' : 'Inactive'}
              </Tag>
            ),
          },
          {
            title: 'Action',
            key: 'action',
            dataIndex: 'status',
            render: (status, category) =>
              !status ? (
                <Button
                  type="primary"
                  className="bg-green-500 border-none rounded"
                  onClick={() =>
                    updateCategory(category.categoryId, {
                      ...category,
                      status: true,
                    })
                  }
                >
                  Enable
                </Button>
              ) : (
                <Button
                  type="primary"
                  className="bg-red-500 border-none rounded"
                  onClick={() =>
                    updateCategory(category.categoryId, {
                      ...category,
                      status: false,
                    })
                  }
                >
                  Disable
                </Button>
              ),
          },
        ]}
        dataSource={categories}
        pagination={{ pageSize: 5 }}
      />
    </AdminLayout>
  );
}
