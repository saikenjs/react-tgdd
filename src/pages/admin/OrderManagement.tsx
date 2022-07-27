import { Table, Tag, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import AdminLayout from '../../layouts/AdminLayout';

export function OrderManagement() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    setLoading(true);
    api
      .get('/admin/order')
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AdminLayout>
      <div>
        <Typography.Title>Order Management</Typography.Title>
      </div>
      <Table
        loading={loading}
        dataSource={orders}
        columns={[
          { title: 'ID', dataIndex: 'orderId' },
          { title: 'Customer Name', dataIndex: 'customerName' },
          {
            title: 'Order Date',
            dataIndex: 'orderDate',
            render: date => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          },
          { title: 'Address', dataIndex: 'address' },
          { title: 'Phone', dataIndex: 'phoneNumber' },
          { title: 'Total Price', dataIndex: 'totalPrice' },
          {
            title: 'Status',
            dataIndex: 'shippingStatus',
            render: status => (
              <Tag color={status ? 'green' : 'orange'}>
                {status ? 'Đã giao hàng' : 'Chờ xác nhận'}
              </Tag>
            ),
          },
        ]}
      />
    </AdminLayout>
  );
}
