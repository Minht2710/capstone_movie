import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import useReponsive from "../../hooks/useReponsive";

export const NotifyContext = React.createContext(null);
const UserTemplate = () => {
  const { isMobile, isTablet, isDesktop } = useReponsive();
  // console.log(isMobile);
  // console.log(isTablet);
  // console.log(isDesktop);
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const [closeTime, setCloseTime] = useState(2000);
  const renderNotify = (notify) => {
    return toast(notify);
  };
  // const handleCloseTime = (time) => {
  //   setCloseTime(time);
  // };
  return (
    <NotifyContext.Provider

      value={renderNotify}
    >
      {isLoading ? <Loading /> : null}
      <Outlet /> <br /> <br />
      <div className=" bg-gray-800 pt-4 ">
        <div className="footer   flex flex-wrap  w-9/12 mx-auto">
          {/* cột 1 */}
          <div className="w-4/12" >

            <h2 className="text-white font-bold">TIX </h2>
            <br />
            <div className="flex">
              <div className="w-1/2 text-gray-400 ">
                <a className="hover:text-gray-50" href="#">FAQ</a> <br />
                <a className="hover:text-gray-50" href="#">Brand Guidelines</a>
              </div>

              <div className="w-1/2 text-gray-400 ">
                <a className="hover:text-gray-50" href="#">Thỏa thuận sử dụng</a> <br />
                <a className="hover:text-gray-50" href="#">Chính sách bảo mật</a>
              </div>


            </div>

          </div>

          {/* cột 2 */}
          <div className="w-4/12">
            <h2 className="text-white font-bold">ĐỐI TÁC</h2> <br />
            <div className="grid grid-cols-4 gap-4">
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo1} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo2} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo3} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo4} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo5} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo6} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo7} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo8} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo9} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo10} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo11} alt="" />
              </a>
              <a href="#">
                <img className="hover:opacity-80 w-8 rounded-full" src={footerLogo12} alt="" />
              </a>

            </div>

          </div>

          {/* cột 3 */}
          <div className="w-2/12" >
            <h2 className="text-white font-bold">MOBILE APP</h2> <br />
            <a href="#">
              <img className="w-8 rounded-full inline" src={iphoneLogo} alt="" />
            </a>
            <div className="pl-1 inline">

              <a href="#">
                <img className="w-8 rounded-full inline" src={androidLogo} alt="" />
              </a>
            </div>
          </div>

          {/* cột 4 */}
          <div className="w-2/12" >
            <h2 className="text-white font-bold">SOCIAL</h2> <br />
            <a href="#">
              <img className="w-8 rounded-full inline" src={facebookLogo} alt="" />
            </a>
            <div className="pl-1 inline">

              <a href="#">
                <img className="w-8 rounded-full inline" src={zaloLogo} alt="" />
              </a>
            </div>
          </div>

          {/* đường kẻ */}
          <div className="w-full h-1 bg-white mt-7 mb-8"></div>

          {/* nội dung dưới dòng kẻ */}
          <div className="w-full flex flex-wrap">
            <div className="w-2/12">
              <img src={logoCongTy} alt="" />
            </div>
            <div className="w-8/12 text-white">
              <p>
                TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION <br /> <br />

                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam. <br />
                Giấy chứng nhận đăng ký kinh doanh số: 0101659783, <br />
                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp. <br />
                Số Điện Thoại (Hotline): 1900 545 436 <br /> <br /> <br />
              </p>
            </div>
            <div className="w-2/12">
              <img src={daThongBaoLogo} alt="" />
            </div>
          </div>





        </div>


      </div>
      <ToastContainer autoClose={closeTime} theme="dark" />
    </NotifyContext.Provider>
  );
};

export default UserTemplate;
