import React from "react";
import Header from "./../../layout/Header/Header";
import Footer from "./../../layout/Footer/Footer";
import LstGheNgoi from "../../layout/listGheNgoi/lstGheNgoi";
import Cart from "../../layout/Cart/Cart";
import "./_buyTicket.scss";

const BuyTicket = () => {
  return (
    <>
      {/* header */}
      <Header />

      {/* danh sách ghế */}
      <div className="thongTinChiTietGhe">
        <div className="container">
          <h2 className="dat-cho-title uppercase text-center text-4xl font-bold mt-20">
            đặt chỗ
          </h2>
          <div className="dat-cho-content w-full flex justify-center mx-auto">
            {/* màn hình, sơ đồ rạp */}
            <div className="rapChieu">
              <div className="rap-chieu">
                <div className="man-hinh-rap-chieu text-center relative block">
                  <div className="block bg-black w-4/6 h-5 rounded-tr-full rounded-tl-full absolute right-1/2 translate-x-1/2">
                    <span className="block uppercase text-yellow-300">
                      màn hình
                    </span>
                  </div>
                </div>
                <LstGheNgoi />
              </div>
            </div>
            {/* thông tin thanh toán  */}
            <Cart />
          </div>
        </div>
      </div>
      {/* footer  */}
      <Footer />
    </>
  );
};

export default BuyTicket;
