/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Empty, Form, Input, Table, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { api } from '../api';
import BaseLayout from '../layouts/BaseLayout';
import { Product } from '../types/Product';

const Wrapper = styled.div`
  background: url(https://cdn.tgdd.vn/mwgcart/orderhistory/images/bg.png);
`;

interface OrderRow {
  id: string | number;
  image: string;
  name: string;
  productId: string | number;
  price: number;
  date: Date | string;
  status: boolean;
}

export function OrderHistory() {
  const [orderHistories, setOrderHistories] = useState<any>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/productForCus').then(({ data }) => setProducts(data));
  }, []);

  const convert = (orderHistories: any[]): OrderRow[] => {
    const res: OrderRow[] = [];

    orderHistories?.forEach(e => {
      const t = {
        id: e.orderId,
        date: e.orderDate,
        status: e.shippingStatus,
      };
      e.orderDetailList?.forEach((e: { productId: number; unitPrice: any }) => {
        const p = products.find(i => e.productId === i.productId);
        res.push({
          ...t,
          productId: e.productId,
          price: e.unitPrice,
          image: p?.image ?? '',
          name: p?.productName ?? '',
        });
      });
    });

    return res;
  };

  const orderRows = orderHistories ? convert(orderHistories) : null;

  return (
    <BaseLayout>
      <Wrapper>
        <div className="container flex justify-center">
          {!orderHistories && (
            <div className="w-[500px] bg-white border mt-6 rounded border-gray-300 border-solid flex flex-col p-6">
              <img
                className="w-full"
                src="https://www.thegioididong.com/lich-su-mua-hang/images/i1.png"
              />
              <Typography.Title
                level={4}
                className="mt-4 mb-12 font-normal text-center"
              >
                Tra cứu thông tin đơn hàng
              </Typography.Title>
              <Form
                onFinish={({ phone }) => {
                  api
                    .get(`/viewhistory/${phone}`)
                    .then(({ data }) => setOrderHistories(data))
                    .catch(() => setOrderHistories(null));
                }}
              >
                <Form.Item name="phone">
                  <Input
                    prefix={<PhoneFilled className="text-blue-400" />}
                    type="tel"
                    size="large"
                    className="rounded-full"
                  />
                </Form.Item>

                <div className="flex justify-center">
                  <Button
                    htmlType="submit"
                    className="border-none rounded-full bg-gradient-to-tr from-[#51beed] to-[#288ad6] text-white h-12 w-32"
                  >
                    Tiếp tục
                  </Button>
                </div>
              </Form>
            </div>
          )}

          {orderRows && orderRows.length !== 0 ? (
            <div className="flex flex-col pt-6">
              <div className="pl-6">
                Chào <strong>{orderHistories[0].customerName}</strong> -{' '}
                <strong>{orderHistories[0].phoneNumber}</strong>
              </div>
              <div className="w-full p-6 mt-4 bg-white border border-gray-400 border-solid rounded-2xl">
                <Typography.Title level={4}>
                  Đơn hàng đã mua gần đây
                </Typography.Title>
                <Table
                  dataSource={orderRows}
                  columns={[
                    { title: 'Mã đơn hàng', dataIndex: 'id' },
                    {
                      title: 'Sản phẩm',
                      render: (_, record) => (
                        <div className="flex gap-3">
                          <img className="w-10 h-10" src={record.image} />
                          <span>{record.name}</span>
                        </div>
                      ),
                    },
                    {
                      title: 'Giá',
                      dataIndex: 'price',
                      render: price => (
                        <span className="font-bold text-red-500">
                          {(price as number).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      ),
                    },
                    {
                      title: 'Ngày đặt mua',
                      dataIndex: 'date',
                      render: date =>
                        moment(date, 'YYYY-MM_DD').format('DD/MM/YYYY'),
                    },
                    {
                      title: 'Trạng thái đơn hàng',
                      dataIndex: 'status',
                      render: status => (
                        <span
                          className={
                            status ? 'text-green-500' : 'text-amber-600'
                          }
                        >
                          {status ? 'Đã giao thành công' : 'Chờ xác nhận'}
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          ) : (
            <div className="w-full p-6 mt-4 text-lg bg-white border border-gray-400 border-solid rounded-2xl">
              <Typography>
                Quý khách chưa từng mua hàng ở hệ thống của chúng tôi !
              </Typography>
              <div>
                <Empty />
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </BaseLayout>
  );
}
