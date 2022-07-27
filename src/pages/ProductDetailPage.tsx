import { HistoryOutlined, SafetyOutlined } from '@ant-design/icons';
import { Divider, Rate, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { api } from '../api';

import BaseLayout from '../layouts/BaseLayout';
import { cartAtom, CartItem } from '../recoil/atoms/CartAtom';
import { Product } from '../types/Product';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const setCart = useSetRecoilState(cartAtom);

  useEffect(() => {
    api.get(`/product/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <Spin />;

  return (
    <BaseLayout>
      <div className="container pt-6">
        <Typography.Title level={4}>{product.productName}</Typography.Title>
        <div className="flex items-center gap-6">
          <Rate className="text-amber-500" allowClear allowHalf value={4.5} />
          <span>471 Đánh giá</span>
        </div>
        <Divider />
      </div>

      <div className="container flex gap-4">
        <div className="w-3/5">
          <img src={product.image} className="object-contain w-full h-96" />
          <div className="grid grid-cols-2 my-8 gap-x-6 gap-y-12">
            <div className="flex items-center gap-4">
              <HistoryOutlined className="text-[32px] text-blue-400" />
              <span>
                Hư gì đổi nấy <strong>12 tháng</strong> tại 3190 siêu thị toàn
                quốc (miễn phí tháng đầu)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <SafetyOutlined className="text-[32px] text-blue-400" />
              <span>
                Bảo hành <strong>chính hãng điện thoại 1 năm</strong> tại các
                trung tâm bảo hành hãng
              </span>
            </div>
          </div>

          <Divider />

          <div>
            <Typography.Title level={3}>Thông tin sản phẩm</Typography.Title>
            <Typography.Paragraph className="font-bold">
              {product.description}
            </Typography.Paragraph>
          </div>
        </div>
        <div className="w-2/5">
          <div className="overflow-hidden border border-red-300 rounded">
            <div className="flex bg-red-600 p-[10px] gap-4 items-center">
              <img
                className="w-[72px] h-[42px]"
                src="https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/TGDD/Mobile/title_onlinesaving.png"
              />
              <div className="flex flex-col pl-4 border-l border-gray-100">
                <span className="text-lg font-bold text-amber-300">
                  {product.unitPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
                <span className="text-white">Kết thúc 31/07</span>
              </div>
            </div>

            <div className="p-4">
              <ul className="pl-4 mb-6 list-disc">
                <li>Chỉ áp dụng giao tận nơi.</li>
                <li>Thời gian nhận hàng: 1 ngày sau khi đặt</li>
                <li>Không áp dụng chung với khuyến mãi khác.</li>
                <li>Mỗi khách hàng (1 SĐT) chỉ được mua 1 sản phẩm</li>
                <li>Áp dụng góp Online qua thẻ tín dụng</li>
                <li>Bắt buộc khui hộp và kích hoạt khi nhận máy</li>
                <li>Không áp dụng góp nhà tài chính</li>
                <li>Số lượng có hạn, áp dụng tùy tỉnh thành</li>
                <li>Hư gì đổi nấy trong 15 ngày nếu lỗi do nhà sản xuất</li>
              </ul>
              {/* 
              <button className="w-full py-4 mb-3 font-bold text-center text-white bg-red-600 rounded">
                <span>MUA NGAY GIÁ </span>
                {product.unitPrice.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </button> */}
              <button className="flex flex-col items-center w-full py-2 mb-3 text-white bg-blue-600 rounded ">
                <span className="font-bold">TRẢ GÓP QUA THẺ</span>
                <span>Visa, Mastercard, JCB, Amex</span>
              </button>
            </div>
          </div>
          <Divider>Hoặc mua giá thường</Divider>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-xl font-bold text-red-600">
              {product.unitPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
              *
            </span>
          </div>

          <button
            type="submit"
            className="py-3 font-bold w-full border-none rounded bg-gradient-to-b from-[#f79429] to-[#f7712e] text-white"
            onClick={() => {
              setCart(cart => {
                const idx = cart.findIndex(
                  e => e.product.productId === product.productId,
                );
                if (idx !== -1)
                  return cart.map<CartItem>((e, i) =>
                    i === idx ? { ...e, amount: e.amount + 1 } : e,
                  );
                return [...cart, { product, amount: 1 }];
              });
            }}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
