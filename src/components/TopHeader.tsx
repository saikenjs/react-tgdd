import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

const menu = [
  { icon: 'phone', text: 'Điện thoại' },
  { icon: 'laptop', text: 'Laptop' },
  { icon: 'tablet', text: 'Tablet' },
  { icon: 'phu-kien', text: 'Phụ kiện' },
  { icon: 'smartwatch', text: 'Smartwatch' },
  { icon: 'watch', text: 'Đồng hồ' },
  { icon: 'pc', text: 'PC, Máy in' },
];

export function TopHeader() {
  return (
    <div className="bg-[#ffd400] h-[114px]">
      <div className="container">
        <div className="h-[50px] flex items-end justify-between">
          <Link to="/">
            <img className="h-[40px] w-[228px]" src="/images/logo.png" />
          </Link>

          <Input
            className="w-[300px] h-[40px] border-none rounded"
            placeholder="Bạn tìm gì ..."
            suffix={<SearchOutlined className="text-lg text-slate-500" />}
          />

          <div className="flex gap-5">
            <Button className="bg-[#ffac0a] border-none rounded h-10">
              Lịch sử đơn hàng
            </Button>
            <Link to="/cart">
              <Button className="bg-[#ffac0a] border-none rounded h-10 flex items-center gap-2">
                <ShoppingCartOutlined className="text-xl" />
                <Typography>Giỏ hàng</Typography>
              </Button>
            </Link>
          </div>
        </div>

        <div className="h-[64px] flex items-center gap-10">
          {menu.map(({ icon, text }) => (
            <div key={icon} className="flex gap-[5px] cursor-pointer">
              <img className="w-5 h-5" src={`/icons/icon-${icon}.png`} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
