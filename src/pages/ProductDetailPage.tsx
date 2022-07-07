import {
  HistoryOutlined,
  InboxOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { Divider, Rate, Select, Tag, Typography } from 'antd';

import BaseLayout from '../layouts/BaseLayout';

export default function ProductDetailPage() {
  return (
    <BaseLayout>
      <div className="container pt-6">
        <Typography.Title level={4}>
          Điện thoại iPhone 13 Pro Max 128GB
        </Typography.Title>
        <div className="flex items-center gap-6">
          <Rate className="text-amber-500" allowClear allowHalf value={4.5} />
          <span>471 Đánh giá</span>
        </div>
        <Divider />
      </div>

      <div className="container flex gap-4">
        <div className="w-3/5">
          <img src="https://cdn.tgdd.vn/Products/Images/42/230529/Slider/RV-iphone-13-pro-max-Gioi-thieu-1020x570.jpg" />
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

            <div className="flex items-center gap-4">
              <InboxOutlined className="text-[32px] text-blue-400" />
              <span>
                Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning
                - Type C
              </span>
            </div>
          </div>

          <Divider />

          <div>
            <Typography.Title level={3}>Thông tin sản phẩm</Typography.Title>
            <Typography.Paragraph className="font-bold">
              Điện thoại iPhone 13 Pro Max 128 GB - siêu phẩm được mong chờ nhất
              ở nửa cuối năm 2021 đến từ Apple. Máy có thiết kế không mấy đột
              phá khi so với người tiền nhiệm, bên trong đây vẫn là một sản phẩm
              có màn hình siêu đẹp, tần số quét được nâng cấp lên 120 Hz mượt
              mà, cảm biến camera có kích thước lớn hơn, cùng hiệu năng mạnh mẽ
              với sức mạnh đến từ Apple A15 Bionic, sẵn sàng cùng bạn chinh phục
              mọi thử thách.
            </Typography.Paragraph>
          </div>
        </div>
        <div className="w-2/5">
          <div className="mb-4">
            <Tag className="px-3 py-2 text-white bg-blue-400 cursor-pointer">
              125GB
            </Tag>
            <Tag className="px-3 py-2 cursor-pointer">256GB</Tag>
            <Tag className="px-3 py-2 cursor-pointer">1TB</Tag>
          </div>
          <div className="mb-4">
            <Tag className="px-3 py-2 text-white bg-blue-400 cursor-pointer">
              Vàng đồng
            </Tag>
            <Tag className="px-3 py-2 cursor-pointer">Bạc</Tag>
            <Tag className="px-3 py-2 cursor-pointer">Xám</Tag>
            <Tag className="px-3 py-2 cursor-pointer">Xanh lá</Tag>
            <Tag className="px-3 py-2 cursor-pointer">Xanh dương</Tag>
          </div>

          <div className="overflow-hidden border border-red-300 rounded">
            <div className="flex bg-red-600 p-[10px] gap-4 items-center">
              <img
                className="w-[72px] h-[42px]"
                src="https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/TGDD/Mobile/title_onlinesaving.png"
              />
              <div className="flex flex-col pl-4 border-l border-gray-100">
                <span className="text-lg font-bold text-amber-300">
                  31.290.000₫
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

              <button className="w-full py-4 mb-3 font-bold text-center text-white bg-red-600 rounded">
                MUA NGAY GIÁ 31.290.000₫
              </button>
              <button className="flex flex-col items-center w-full py-2 mb-3 text-white bg-blue-600 rounded ">
                <span className="font-bold">TRẢ GÓP QUA THẺ</span>
                <span>Visa, Mastercard, JCB, Amex</span>
              </button>
            </div>
          </div>
          <Divider>Hoặc mua giá thường</Divider>

          <div className="mb-4">
            <span>Giá tại: </span>
            <Select defaultValue={0}>
              <Select.Option value={0}>Hồ Chí Minh</Select.Option>
              <Select.Option value={1}>Hà Nội</Select.Option>
              <Select.Option value={2}>Đà Nẵng</Select.Option>
            </Select>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-xl font-bold text-red-600">
              32.290.000₫ *
            </span>
            <Tag>Trả góp 0%</Tag>
          </div>

          <button
            type="submit"
            className="py-3 font-bold w-full border-none rounded bg-gradient-to-b from-[#f79429] to-[#f7712e] text-white"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
