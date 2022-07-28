/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Badge, Button, Input, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { api } from '../api';
import { locations } from '../data/location';
import { cartAtom } from '../recoil/atoms/CartAtom';
import { filterAtom } from '../recoil/atoms/FilterAtom';
import { Category } from '../types/Category';

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  .ant-select {
    .ant-select-selector {
      background-color: #ffac0a !important;
      color: black !important;
      border: none;
      border-radius: 3px;
    }
    .ant-select-selection-placeholder {
      color: black;
    }
  }
`;

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
  const [filter, setFilter] = useRecoilState(filterAtom);
  const cart = useRecoilValue(cartAtom);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categoryForcus').then(({ data }) => setCategories(data));
  }, []);

  return (
    <div className="bg-[#ffd400] h-[114px]">
      <div className="container">
        <div className="h-[50px] flex items-end justify-between">
          <Wrapper className="flex items-center gap-4">
            <Link to="/">
              <img className="h-[40px] w-[228px]" src="/images/logo.png" />
            </Link>
            <Select
              className="w-40 bg-[#ffd400]"
              placeholder="Chọn vị trí.."
              showSearch
              defaultValue={filter.location}
              onChange={(value, option) =>
                setFilter(prev => ({
                  ...prev,
                  location: {
                    id: (option as any).locationId,
                    name: (option as any).locationName,
                  },
                }))
              }
              filterOption={(input, option) =>
                option?.locationName
                  .toLocaleLowerCase()
                  .includes(input.toLowerCase()) ?? true
              }
              options={[
                { locationName: 'Tất cả', locationId: -1 },
                ...locations,
              ]}
              fieldNames={{ label: 'locationName', value: 'locationId' }}
            />
          </Wrapper>

          <Input
            className="w-[300px] h-[40px] border-none rounded"
            placeholder="Bạn tìm gì ..."
            suffix={<SearchOutlined className="text-lg text-slate-500" />}
            onChange={({ target: { value } }) => {
              setFilter(prev => ({ ...prev, query: value }));
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') navigate('/search');
            }}
          />

          <div className="flex gap-5">
            <Link to="order-history">
              <Button className="bg-[#ffac0a] border-none rounded h-10">
                Lịch sử đơn hàng
              </Button>
            </Link>
            <Link to="/cart">
              <Badge count={cart.reduce((acc, cur) => acc + cur.amount, 0)}>
                <Button className="bg-[#ffac0a] border-none rounded h-10 flex items-center gap-2">
                  <ShoppingCartOutlined className="text-xl" />
                  <Typography>Giỏ hàng</Typography>
                </Button>
              </Badge>
            </Link>
          </div>
        </div>

        <div className="h-[64px] flex items-center gap-10">
          {categories.map(e => (
            <Link
              to={`/category/${e.categoryId}`}
              key={e.categoryId}
              onClick={() =>
                setFilter(prev => ({
                  ...prev,
                  category: { id: e.categoryId, name: e.categoryName },
                }))
              }
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
