import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { locations } from '../../data/location';
import AdminLayout from '../../layouts/AdminLayout';
import { Store } from '../../types/Store';

export function StoreManagement() {
  const [stores, setStores] = useState<Store[]>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const [find, setFind] = useState<string>('');

  const fetch = () =>
    api.get<Store[]>('/store').then(({ data }) => {
      setStores(data);
    });

  const update = (id: string | number, body: Store) => {
    setLoading(true);
    api
      .put(`/admin/store/${id}`, body)
      .then(_ => message.success('Update successfully!'))
      .catch(_ => message.error('Update failed!'))
      .finally(() => fetch().finally(() => setLoading(false)));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <Typography.Title>Store Management</Typography.Title>
        <Button
          className="text-white border-none rounded bg-amber-500"
          onClick={() => setShowModal(true)}
        >
          Add Store +
        </Button>
      </div>

      <div className="flex justify-end mb-6">
        <Input
          className="w-1/3 rounded"
          size="large"
          suffix={<SearchOutlined />}
          value={find}
          onChange={e => setFind(e.target.value)}
        />
      </div>

      <Modal
        closeIcon={null}
        visible={showModal}
        onOk={() => {
          setLoading(true);
          api
            .post('/admin/store', form.getFieldsValue())
            .then(() => message.success('Create Successfully'))
            .catch(() => message.error('Create failed!'))
            .finally(() => {
              setLoading(false);
              setShowModal(false);
            });
        }}
        onCancel={() => setShowModal(false)}
        okText="Create Store"
      >
        <Form className="pt-10" form={form} disabled={loading}>
          <Form.Item label="Name" name="storeName" required>
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status" required>
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item label="Location" name="locationId">
            <Select
              className="w-40"
              placeholder="Chọn vị trí.."
              showSearch
              filterOption={(input, option) =>
                option?.locationName
                  .toLocaleLowerCase()
                  .includes(input.toLowerCase()) ?? true
              }
              options={locations}
              fieldNames={{ label: 'locationName', value: 'locationId' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        loading={loading}
        rowKey={record => record.storeId}
        columns={[
          { title: 'ID', key: 'id', dataIndex: 'storeId' },
          { title: 'Name', key: 'name', dataIndex: 'storeName' },
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
            render: (status, record) =>
              !status ? (
                <Button
                  type="primary"
                  className="bg-green-500 border-none rounded"
                  onClick={() =>
                    update(record.storeId, {
                      ...record,
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
                    update(record.storeId, {
                      ...record,
                      status: false,
                    })
                  }
                >
                  Disable
                </Button>
              ),
          },
        ]}
        dataSource={stores?.filter(e =>
          e.storeName.toLowerCase().includes(find.toLowerCase()),
        )}
        pagination={{ pageSize: 10 }}
      />
    </AdminLayout>
  );
}
