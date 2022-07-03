import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useRef, useState } from 'react';

export function TopBanner() {
  const carouselRef = useRef<CarouselRef>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={` ${currentSlide ? 'bg-[#8dd5fe]' : 'bg-[#ffc602]'}`}>
      <div className="container relative">
        <Carousel
          ref={carouselRef}
          autoplay
          dots={false}
          afterChange={setCurrentSlide}
          fade
        >
          {[0, 1].map(e => (
            <div
              key={e}
              className="text-center text-blue-700 h-11 bg-slate-300"
            >
              <img src={`/images/banner-${e}.png`} alt={`banner-${e}`} />
            </div>
          ))}
        </Carousel>

        <LeftOutlined
          className="absolute left-0 text-[30px] text-slate-500 top-2"
          onClick={() => carouselRef.current?.prev()}
        />
        <RightOutlined
          className="absolute right-0 text-[30px] text-slate-500 top-2"
          onClick={() => carouselRef.current?.next()}
        />
      </div>
    </div>
  );
}
