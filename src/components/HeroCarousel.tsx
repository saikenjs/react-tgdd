import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useRef } from 'react';

export function HeroCarousel() {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <div className="h-[91px] relative">
      <div className="container h-[182px] absolute bottom-0 left-0 right-0">
        <Carousel
          autoplay
          ref={carouselRef}
          slidesToShow={2}
          slidesToScroll={2}
          dots={false}
        >
          {[0, 1, 2, 3, 4, 5, 6].map(id => (
            <div key={id} className="overflow-hidden px-[5px] h-full">
              <img
                className="w-full h-full rounded-lg shadow"
                src={`/images/slide-${id}.png`}
                alt=""
              />
            </div>
          ))}
        </Carousel>

        <div
          onClick={() => carouselRef.current?.prev()}
          className="cursor-pointer absolute -left-[22px] flex items-center justify-center bg-white rounded-full top-[69px] w-11 h-11 shadow opacity-70"
        >
          <LeftOutlined />
        </div>

        <div
          onClick={() => carouselRef.current?.next()}
          className="cursor-pointer absolute -right-[22px] flex items-center justify-center bg-white rounded-full top-[69px] w-11 h-11 shadow opacity-70"
        >
          <RightOutlined />
        </div>
      </div>
    </div>
  );
}
