import { Form, Input, InputNumber, message, Select, Typography } from 'antd';
import { useRecoilState } from 'recoil';
import { api } from '../api';
import { TopBanner } from '../components/TopBanner';
import { TopHeader } from '../components/TopHeader';
import { cartAtom } from '../recoil/atoms/CartAtom';

export default function CartPage() {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [form] = Form.useForm();

  return (
    <div className="bg-[#f3f3f3] min-h-screen">
      <TopBanner />
      <TopHeader />
      <div className="container flex gap-6 my-8">
        <div className="flex flex-col w-2/3 gap-6 grow">
          {cart.map(item => (
            <div
              key={item.product.productId}
              className="flex gap-6 p-4 bg-white rounded-lg shadow"
            >
              <img className="w-28 h-28" src={item.product.image} alt="" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  {item.product.productName}
                </span>

                <div className="mt-auto">
                  <span>Số lượng: </span>
                  <InputNumber
                    onChange={value =>
                      setCart(cart =>
                        cart.map(e =>
                          e.product.productId === item.product.productId
                            ? { ...e, amount: value }
                            : e,
                        ),
                      )
                    }
                    value={item.amount}
                    min={0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Form
          form={form}
          className="w-1/3 p-4 bg-white rounded"
          layout="vertical"
          onFinish={values => {
            if (cart.length === 0) {
              message.warn('Giỏ hàng trống, vui lòng thêm sản phẩm!');
              return;
            }

            api
              .post('/checkout', {
                ...values,
                orderDate: Date.now(),
                totalPrice: cart.reduce(
                  (acc, { product, amount }) =>
                    acc + (product.salePrice || product.unitPrice) * amount,
                  0,
                ),
                orderDetailList: cart.map(item => ({
                  productId: item.product.productId,
                  unitPrice: item.product.unitPrice,
                  quantity: item.amount,
                })),
              })
              .then(() => {
                message.success('Order success! Please check your mail.');
                setCart([]);
                form.resetFields();
              })
              .catch(() => message.error('Failed! Please try again'));
          }}
        >
          <Typography.Title level={4}>Thông tin khách hàng:</Typography.Title>
          <Form.Item
            label="Họ và tên"
            name="customerName"
            rules={[{ required: true }]}
          >
            <Input size="large" className="rounded" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true }]}
          >
            <Input size="large" className="rounded" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input size="large" className="rounded" type="tel" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" size="large" className="rounded" />
          </Form.Item>

          <Form.Item
            label="Hình thức vận chuyển"
            name="shippingType"
            rules={[{ required: true }]}
          >
            <Select
              size="large"
              className="rounded"
              options={[
                { value: 'Giao hàng tiết kiệm' },
                { value: 'Giao hàng nhanh' },
                { value: 'Best Express' },
                { value: 'Vietnam Post' },
                { value: 'Viettel Post' },
              ]}
              fieldNames={{ label: 'value' }}
            />
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
