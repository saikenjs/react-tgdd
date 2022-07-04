import { Form, Input, InputNumber, Typography } from 'antd';
import { TopBanner } from '../components/TopBanner';
import { TopHeader } from '../components/TopHeader';

export default function CartPage() {
  return (
    <div className="bg-[#f3f3f3] min-h-screen">
      <TopBanner />
      <TopHeader />
      <div className="container flex gap-6 my-8">
        <div className="flex flex-col w-2/3 gap-6 grow">
          <div className="flex gap-6 p-4 bg-white rounded-lg shadow">
            <img
              className="w-28 h-28"
              src="https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-gold-1-200x200.jpg"
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold">
                Điện thoại iPhone 13 Pro Max 128GB
              </span>
              <span>Phân loại: Gold</span>
              <div className="mt-auto">
                <span>Số lượng: </span>
                <InputNumber defaultValue={5} value={4} min={0} />
              </div>
            </div>
          </div>

          <div className="flex gap-6 p-4 bg-white rounded-lg shadow">
            <img
              className="w-28 h-28"
              src="https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-gold-1-200x200.jpg"
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold">
                Điện thoại iPhone 13 Pro Max 128GB
              </span>
              <span>Phân loại: Gold</span>
              <div className="mt-auto">
                <span>Số lượng: </span>
                <InputNumber defaultValue={5} value={4} min={0} />
              </div>
            </div>
          </div>
        </div>
        <Form className="w-1/3 p-4 bg-white rounded" layout="vertical">
          <Typography.Title level={4}>Thông tin khách hàng:</Typography.Title>
          <Form.Item label="Họ và tên: ">
            <Input size="large" className="rounded" />
          </Form.Item>

          <Form.Item label="Địa chỉ: ">
            <Input size="large" className="rounded" />
          </Form.Item>

          <Form.Item label="Số điện thoại: ">
            <Input size="large" className="rounded" type="tel" />
          </Form.Item>

          <button
            type="submit"
            className="py-3 font-bold w-full border-none rounded bg-gradient-to-b from-[#f79429] to-[#f7712e] text-white"
          >
            Đặt hàng
          </button>
        </Form>
      </div>
    </div>
  );
}
