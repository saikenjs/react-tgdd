import { Form, Input, InputNumber, Typography } from 'antd';
import { useRecoilState } from 'recoil';
import { TopBanner } from '../components/TopBanner';
import { TopHeader } from '../components/TopHeader';
import { cartAtom } from '../recoil/atoms/CartAtom';

export default function CartPage() {
  const [cart, setCart] = useRecoilState(cartAtom);

  console.log(cart);

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
