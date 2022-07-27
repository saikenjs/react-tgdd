import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { Category } from '../types/Category';

const fixedData = [
  { id: 1, icon: 'phone', text: 'Điện thoại' },
  { id: 2, icon: 'laptop', text: 'Laptop' },
  { id: 3, icon: 'tablet', text: 'Tablet' },
  { id: 4, icon: 'phu-kien', text: 'Phụ kiện' },
  { id: 5, icon: 'smartwatch', text: 'Smartwatch' },
  { id: 6, icon: 'watch', text: 'Đồng hồ' },
];

export function TopHeader() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('/categoryForcus').then(({ data }) => setCategories(data));
  }, []);

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
          {categories.map(e => (
            <Link
              to={`/category/${e.categoryId}`}
              key={e.categoryId}
              className="flex gap-[5px] cursor-pointer"
            >
              <img
                className="w-5 h-5"
                src={`/icons/icon-${
                  fixedData.find(i => i.id === e.categoryId)?.icon
                }.png`}
              />
              <span className="text-black">
                {fixedData.find(i => i.id === e.categoryId)?.text ??
                  e.categoryName}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
