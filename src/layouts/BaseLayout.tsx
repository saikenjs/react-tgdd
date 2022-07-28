import { Typography } from 'antd';
import { ReactNode } from 'react';
import { TopHeader } from '../components/TopHeader';

interface Props {
  children: ReactNode;
}

export default function BaseLayout({ children }: Props) {
  return (
    <div className="bg-[#f3f3f3] relative">
      {/* <div className="container sticky top-0">
        {scrollPosition > 500 && (
          <>
            <img
              className="absolute w-20 -left-24 top-[40vh] -translate-y-1/2"
              src="https://cdn.tgdd.vn/2022/07/banner/Lien-Trai-80x275.png"
            />
            <img
              className="absolute w-20 -right-24 top-[40vh] -translate-y-1/2"
              src="https://cdn.tgdd.vn/2022/07/banner/Lien-Trai-80x275.png"
            />
          </>
        )}
      </div> */}
      {/* <TopBanner /> */}
      <TopHeader />

      {children}

      <footer className="pt-4 mt-12 bg-white border-t">
        <div className="container grid grid-cols-4 pb-6">
          <div className="flex flex-col gap-2">
            <Typography>Tích điểm Quà tặng VIP</Typography>
            <Typography>Lịch sử mua hàng</Typography>
            <Typography>Cộng tác bán hàng cùng TGDĐ</Typography>
            <Typography>Tìm hiểu về mua trả góp</Typography>
            <Typography>Chính sách bảo hành</Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography>Giới thiệu công ty (MWG.vn)</Typography>
            <Typography>Tuyển dụng</Typography>
            <Typography>Gửi góp ý, khiếu nại</Typography>
            <Typography>Tìm siêu thị (3.192 shop)</Typography>
            <Typography>Chính sách bảo hành</Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="font-bold">Tổng đài hỗ trợ: </Typography>
            <div>
              Gọi mua:
              <span className="font-bold text-blue-400"> 1800.1060 </span>
              (7:30 - 22:00)
            </div>

            <div>
              Kỹ thuật:
              <span className="font-bold text-blue-400"> 1800.1763 </span>
              (7:30 - 22:00)
            </div>

            <div>
              Khiếu nại:
              <span className="font-bold text-blue-400"> 1800.1062 </span>
              (8:00 - 21:30)
            </div>

            <div>
              Bảo hành:
              <span className="font-bold text-blue-400"> 1800.1064 </span>
              (8:00 - 21:30)
            </div>
          </div>
        </div>

        <div className="py-8 text-xs bg-gray-200">
          <div className="container">
            © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở
            KH & ĐT TP.HCM cấp ngày 02/01/2007. GPMXH: 238/GP-BTTTT do Bộ Thông
            Tin và Truyền Thông cấp ngày 04/06/2020.
            <br />
            Địa chỉ: 128 Trần Quang Khải, P. Tân Định, Q.1, TP.Hồ Chí Minh. Điện
            thoại: 028 38125960. Email: cskh@thegioididong.com. Chịu trách nhiệm
            nội dung: Huỳnh Văn Tốt.
          </div>
        </div>
      </footer>
    </div>
  );
}
