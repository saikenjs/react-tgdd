import { CloseCircleFilled } from '@ant-design/icons';
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
import { Manufacturer } from '../../types/Manufacturer';

export function ManufacturerManagement() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetch = () => {
    setLoading(true);
    api
      .get('/admin/manufacturer')
      .then(({ data }) => setManufacturers(data))
      .finally(() => setLoading(false));
  };

  const upsert = ({
    id,
    data,
  }: {
    id?: number | string;
    data: Manufacturer;
  }) => {
    setLoading(true);
    if (id) {
      api
        .put(`/admin/updatemanufacturer/${id}`, data)
        .then(() => message.success('Update manufacturer success!'))
        .catch(() => message.error('Update manufacturer failed!'))
        .finally(() => {
          fetch();
          setLoading(false);
        });
    } else {
      api
        .post('/admin/manufacturer', data)
        .then(() => message.success('Create manufacturer success!'))
        .catch(() => message.error('Create manufacturer failed!'))
        .finally(() => {
          setShowModal(false);
          fetch();
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <Typography.Title>Manufacturer Management</Typography.Title>
        <Button
          className="bg-yellow-200 border-none rounded-xl"
          onClick={() => setShowModal(true)}
        >
          Add Manufacturer +
        </Button>
      </div>

      <Modal
        visible={showModal}
        footer={null}
        closeIcon={<CloseCircleFilled onClick={() => setShowModal(false)} />}
      >
        <Form className="pt-6" onFinish={data => upsert({ data })}>
          <Form.Item label="Name" name="manufacturerName" required>
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status" required>
            <Switch />
          </Form.Item>

          <div className="flex justify-end">
            <Button
              htmlType="submit"
              className="bg-yellow-200 border-none rounded-xl"
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal>

      <Table
        rowKey={record => record.manufacturerId}
        loading={loading}
        columns={[
          { title: 'ID', key: 'id', dataIndex: 'manufacturerId' },
          { title: 'Name', key: 'name', dataIndex: 'manufacturerName' },
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
                    upsert({
                      id: record.manufacturerId,
                      data: {
                        ...record,
                        status: true,
                      },
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
                    upsert({
                      id: record.manufacturerId,
                      data: {
                        ...record,
                        status: false,
                      },
                    })
                  }
                >
                  Disable
                </Button>
              ),
          },
        ]}
        dataSource={manufacturers}
        pagination={{ pageSize: 10 }}
      />
    </AdminLayout>
  );
}
