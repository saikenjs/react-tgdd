/* eslint-disable no-nested-ternary */
import { Empty, Typography } from 'antd';
import { sampleSize } from 'lodash';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { api } from '../api';
import { HeroBanner } from '../components/HeroBanner';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/skeleton/ProductSkeleton';
import BaseLayout from '../layouts/BaseLayout';
import { filterAtom } from '../recoil/atoms/FilterAtom';
import { productsAtom } from '../recoil/atoms/ProductsAtom';
import { Product } from '../types/Product';

const trend = [
  {
    id: 188,
    title: 'Samsung Galaxy M51',
    description: 'Galaxy M Series',
    image:
      'https://i.ibb.co/LSXSdTH/1626083876-dien-thoai-samsung-galaxy-m51-den.jpg',
  },
  {
    id: 39,
    title: 'Tab P11 Plus',
    description: 'Mua online có quà',
    image: 'https://i.ibb.co/PWCQd96/photo-1-16322164759171300466163.jpg',
  },
  {
    id: 187,
    title: 'Apple AirPods Pro 2021',
    description: 'Giảm đến 50%',
    image: 'https://i.ibb.co/HVM9h5T/tai-nghe-airpods-pro-didongviet-1-1-1.jpg',
  },
  {
    id: 69,
    title: 'Apple Watch Series 7',
    description: 'Giảm đến 50%++',
    image: 'https://i.ibb.co/W0Q2rTb/apple-watch-s7-lte-41mm-vang-1.jpg',
  },
];

const tabs = ['Cho bạn', 'Sinh nhật 18', 'Chỉ giảm online', 'Deal từ 99k'];

export function Home() {
  const [products, setProducts] = useRecoilState(productsAtom);
  const filter = useRecoilValue(filterAtom);

  const [activeCategory, setActiveCategory] = useState(0);

  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [sale99Products, setSale99Products] = useState<Product[]>([]);

  const sampleProducts =
    activeCategory === 2
      ? saleProducts
      : activeCategory === 3
      ? sale99Products
      : sampleSize(products, 20);

  useEffect(() => {
    if (filter.location) {
      api
        .get(`productByLocation`, {
          params: {
            locationId: filter.location.id,
            categoryId: -1,
          },
        })
        .then(({ data }) => setProducts(data));
    } else {
      api
        .get('/productForCus')
        .then(({ data }) => setProducts(data))
        .catch(err => {
          throw new Error(err);
        });
    }
  }, [filter.location, setProducts]);

  useEffect(() => {
    api.get('/productSale').then(({ data }) => setSaleProducts(data));
    api.get('/productSale99').then(({ data }) => setSale99Products(data));
  }, []);

  return (
    <BaseLayout>
      <HeroBanner />
      <HeroCarousel />
      {/* Trending Section */}
      <div className="container p-6 my-8 bg-gradient-to-r from-[#ffecd2] to-[#fcb69f] rounded-xl">
        <Typography.Title level={4} className="uppercase">
          Xu hướng mua sắm
        </Typography.Title>
        <div className="flex gap-3 ">
          {trend.map((e, i) => (
            <Link to={`/product-detail/${e.id}`} key={i}>
              <div className="w-[280px] h-[236px] bg-slate-50 rounded-lg relative overflow-hidden">
                <img
                  className="absolute inset-0 object-cover w-[280px] h-[160px]"
                  src={e.image}
                />
                <div className="absolute flex flex-col text-lg bottom-3 left-[18px]">
                  <span>{e.title}</span>
                  <span className="text-blue-600 cursor-pointer">
                    {e.description}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommend Section */}
      <section className="container">
        <Typography.Title level={4} className="uppercase">
          Gợi ý hôm nay
        </Typography.Title>
        <div className="flex gap-5 mb-6">
          {tabs.map((e, i) => (
            <div
              key={i}
              className={`cursor-pointer flex items-center justify-center gap-2 rounded-lg shadow-sm grow h-[70px] ${
                activeCategory === i ? 'bg-tab' : 'bg-white'
              }`}
              onClick={() => setActiveCategory(i)}
            >
              <img
                className="w-[50px] h-[50px]"
                src={`/images/tab-${i}.png`}
                alt=""
              />
              <span className="text-lg">{e}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {sampleProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
          {!sampleProducts &&
            [1, 2, 3, 4, 5].map(idx => <ProductSkeleton key={idx} />)}
          {sampleProducts.length === 0 && <Empty className="block mx-auto" />}
        </div>
      </section>
    </BaseLayout>
  );
}
