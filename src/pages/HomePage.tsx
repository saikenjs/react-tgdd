import { Typography } from 'antd';
import { sampleSize } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { api } from '../api';
import { HeroBanner } from '../components/HeroBanner';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/skeleton/ProductSkeleton';
import BaseLayout from '../layouts/BaseLayout';
import { productsAtom } from '../recoil/atoms/ProductsAtom';

const trend = [
  { title: 'Điện thoại', description: 'Galaxy M Series' },
  { title: 'Macbook, iMac', description: 'Mua online có quà' },
  { title: 'Tai nghe không dây', description: 'Giảm đến 50%' },
  { title: 'Smartwatch', description: 'Giảm đến 50%++' },
];

const tabs = ['Cho bạn', 'Sinh nhật 18', 'Chỉ giảm online', 'Deal từ 99k'];

export function Home() {
  const [products, setProducts] = useRecoilState(productsAtom);

  const [activeCategory, setActiveCategory] = useState(0);
  const sampleProducts = sampleSize(products, 20);

  useEffect(() => {
    api
      .get('/productForCus')
      .then(({ data }) => setProducts(data))
      .catch(err => {
        throw new Error(err);
      });
  }, [setProducts]);

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
            <div
              key={i}
              className="w-[280px] h-[236px] bg-slate-50 rounded-lg relative"
            >
              <img
                className="absolute inset-0"
                src={`/images/trending-item-${i}.png`}
              />
              <div className="absolute flex flex-col text-lg bottom-3 left-[18px]">
                <span>{e.title}</span>
                <span className="text-blue-600 cursor-pointer">
                  {e.description}
                </span>
              </div>
            </div>
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
          {sampleProducts.length === 0 &&
            [1, 2, 3, 4, 5].map(idx => <ProductSkeleton key={idx} />)}
        </div>
      </section>
    </BaseLayout>
  );
}
