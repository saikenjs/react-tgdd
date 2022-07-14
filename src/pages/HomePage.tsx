import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import Carousel, { CarouselRef } from 'antd/lib/carousel';
import { padStart, sampleSize } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { api } from '../api';
import { HeroBanner } from '../components/HeroBanner';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/skeleton/ProductSkeleton';
import BaseLayout from '../layouts/BaseLayout';
import { productsAtom } from '../recoil/atoms/ProductsAtom';

const trendings = [
  { title: 'Điện thoại', description: 'Galaxy M Series' },
  { title: 'Macbook, iMac', description: 'Mua online có quà' },
  { title: 'Tai nghe không dây', description: 'Giảm đến 50%' },
  { title: 'Smartwatch', description: 'Giảm đến 50%++' },
];

const categories = [
  'Điện thoại',
  'Laptop',
  'Tablet',
  'Đồng hồ thông minh',
  'Đồng hồ thời trang',
  'Thiết bị mạng',
  'Ốp lưng',
  'Chuột máy tính',
  'Bàn phím',
  'Sim, thẻ cào',
  'Loa',
  'Tai nghe',
  'Sạc dự phòng',
  'Cáp sạc',
  'Máy tính bộ',
  'Máy in',
  'Màn hình máy tính',
  'Phụ kiện gaming',
  'Camera, webcam',
  'Thiết bị nhà thông minh',
];

const services = [
  {
    title: 'Mua mã thẻ cào',
    description: (
      <div>
        <span className="font-bold text-red-600">Giảm 3%</span> cho mệnh giá từ
        100.000 trở lên
      </div>
    ),
    bg: '#dceeff',
  },
  {
    title: 'Dịch vụ đóng tiền',
    description: <div>Điện, nước, internet, cước điện thoại trả sau</div>,
    bg: '#fef5cf',
  },
  {
    title: 'Mua thẻ game',
    description: (
      <div>
        <span className="font-bold text-red-600">Giảm 3%</span> cho tất cả các
        nhà mạng, áp dụng cho mệnh giá từ 100.000 trở lên
      </div>
    ),
    bg: '#ffefdb',
  },
  {
    title: 'Vé máy bay, tàu',
    description: <div>Thu hộ tiền vé xe, vé máy bay, vé tàu</div>,
    bg: '#e1fecf',
  },
];

const tabs = ['Cho bạn', 'Sinh nhật 18', 'Chỉ giảm online', 'Deal từ 99k'];

export function Home() {
  const carouselRef = useRef<CarouselRef>(null);

  const [products, setProducts] = useRecoilState(productsAtom);

  const [activeCategory, setActiveCategory] = useState(0);
  const sampleProducts = sampleSize(products, 20);

  useEffect(() => {
    api
      .get('/product')
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
          {trendings.map((e, i) => (
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

      {/* Highlight categories */}
      <div className="container p-6 my-8 bg-white rounded-xl">
        <Typography.Title level={4} className="uppercase">
          Danh mục nổi bật
        </Typography.Title>
        <div className="grid grid-cols-10">
          {categories.map((name, idx) => (
            <div
              key={name}
              className="cursor-pointer flex flex-col justify-start gap-1 w-28 h-[112px] items-center text-center"
            >
              <img
                className="w-[60px] h-[60px]"
                src={`/images/category${padStart(`${idx + 1}`, 2, '0')}.png`}
              />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buy online  */}
      <div className="container">
        <Typography.Title level={4} className="uppercase mb-[15px]">
          Giảm thêm khi thanh toán online
        </Typography.Title>
        <div className="relative">
          <Carousel
            autoplay
            ref={carouselRef}
            slidesToShow={3}
            slidesToScroll={3}
            dots={false}
          >
            {[0, 1, 2, 3, 4, 5, 6].map(id => (
              <div key={id} className="overflow-hidden px-[5px] h-full">
                <img
                  className="w-full h-full rounded-lg shadow"
                  src={`/images/buy-online-${id}.png`}
                  alt=""
                />
              </div>
            ))}
          </Carousel>

          <div
            onClick={() => carouselRef.current?.prev()}
            className="cursor-pointer absolute -left-[22px] flex items-center justify-center bg-white rounded-full top-[80px] w-11 h-11 shadow opacity-70"
          >
            <LeftOutlined />
          </div>

          <div
            onClick={() => carouselRef.current?.next()}
            className="cursor-pointer absolute -right-[22px] flex items-center justify-center bg-white rounded-full top-[80px] w-11 h-11 shadow opacity-70"
          >
            <RightOutlined />
          </div>
        </div>
      </div>

      {/* Service convinience */}
      <div className="container p-6 my-8 bg-white rounded-xl">
        <Typography.Title level={4} className="uppercase">
          Dịch vụ tiện ích
        </Typography.Title>
        <div className="flex gap-3">
          {services.map((s, idx) => (
            <div
              key={idx}
              className={`flex grow w-full rounded-xl px-[10px] py-[14px] gap-3`}
              style={{ background: s.bg }}
            >
              <img
                src={`/images/service-conv-${idx}.png`}
                className="w-[38px] h-[38px]"
              />
              <div className="pt-2">
                <span className="flex mb-3 text-lg">{s.title}</span>
                <span className="text-lg">{s.description}</span>
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

        <div className="grid grid-cols-5 gap-4 ">
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
