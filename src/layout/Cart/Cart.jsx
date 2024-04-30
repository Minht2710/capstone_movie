import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLichChieu } from "../../redux/slice/muaGheSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from "../../redux/slice/loadingSlice";
import ThanhToan from "../../components/thanhToan/ThanhToan";
import "./_cart.scss";
// import { toast } from "react-toastify";
import { ConfigProvider, Modal } from "antd";
import { quanLyDatChoSerV } from "../../services/quanLyDatCho";
import { getLocalStorage } from "../../utils/util";
import { date } from "yup";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();
  const thongTinVe = useSelector((state) => state.muaGheSlice.lstChoNgoi);
  const gheNgoi = useSelector((state) => state.muaGheSlice.bookingSeat);
  const user = getLocalStorage("user");
  // console.log(accessToken);
  const [tenGhe, setTenGhe] = useState([]);
  const [giaTicket, setTicket] = useState([]);

  // console.log(tenGhe);
  useEffect(() => {
    dispatch(handleTurnOnLoading());
    dispatch(getLichChieu(maLichChieu));
    dispatch(handleTurnOffLoading());
  }, [dispatch, maLichChieu]);

  // thông báo khi chưa đăng nhập
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    [<p className="font-bold">Hãy đăng nhập để tiếp tục thanh toán vé xem phim nhé</p>]
  );
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText([
      <p>
        <i class="fa-sharp fa-solid fa-face-smile-hearts"></i> Chờ giây lát nhé
        ...
      </p>,
    ]);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      navigate("/sign-in");
      setConfirmLoading(false);
    }, 5000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // thông tin phim
  // cập nhạt ghế
  useEffect(() => {
    const tenGheMoi = gheNgoi.map((ghe) => ghe.tenGhe);
    setTenGhe(tenGheMoi);
  }, [gheNgoi]);
  // console.log(gheNgoi);
  useEffect(() => {
    let totalTicketPrice = 0;
    for (let i = 0; i < gheNgoi.length; i++) {
      totalTicketPrice += parseInt(gheNgoi[i].giaVe);
    }
    setTicket(totalTicketPrice);
  }, [gheNgoi]);

  // mua ghe
  const handleBuyTicket = () => {
    if (!user) {
      showModal();
    } else {
      const data = {
        maLichChieu: maLichChieu,
        danhSachVe: [
          gheNgoi.map((ghe) => ({
            maGhe: ghe.maGhe,
            giaVe: ghe.giaVe,
          })),
        ],
      };
      try {
        const headers = { Authorization: `Bearer ${user.accessToken}` };
        const res = quanLyDatChoSerV.gheNgoi(data, { headers });
        console.log("dat ve thanh cong", res);
      } catch {
        console.log("không gửi được");
      }
      // console.log(data)
    }
  };

  return (
    <>
      <div className="thong-tin-ve">
        <div className="thong-tin-ve-user sticky top-5">
          <div className="">
            <h3 className="titleInfoCart uppercase">thông tin đặt vé</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th className="w-1/4"></th>
                <th className="w-3/4"></th>
              </tr>
            </thead>
            <tbody>
              {/* ten phim */}
              <tr>
                <td className="tenDong">Tên Phim: </td>
                <td className="noiDungDong w-full text-right">
                  <p>
                    {thongTinVe &&
                      thongTinVe.thongTinPhim &&
                      thongTinVe.thongTinPhim.tenPhim}
                  </p>
                </td>
              </tr>

              {/* ngay chieu */}
              <tr>
                <td className="tenDong">Ngày Chiếu:</td>
                <td className="noiDungDong w-full text-right">
                  {thongTinVe &&
                    thongTinVe.thongTinPhim &&
                    thongTinVe.thongTinPhim.ngayChieu}
                </td>
              </tr>
              {/* gio chieu */}
              <tr>
                <td className="tenDong">Giờ chiếu:</td>
                <td className="noiDungDong w-full text-right">
                  {thongTinVe &&
                    thongTinVe.thongTinPhim &&
                    thongTinVe.thongTinPhim.gioChieu}
                </td>
              </tr>
              {/* ma rap */}
              <tr>
                <td className="tenDong">Rạp:</td>
                <td className="noiDungDong w-full text-right">
                  {thongTinVe &&
                    thongTinVe.thongTinPhim &&
                    thongTinVe.thongTinPhim.tenRap}
                </td>
              </tr>
              {/* so ghe */}
              <tr className="w-full">
                <td className="tenDong">Số Ghế:</td>
                <td className="noiDungDong  w-full flex flex-wrap justify-end text-right">
                  {tenGhe.map((ten, index) => (
                    <p key={index} className="mr-2">
                      {ten}
                    </p>
                  ))}
                </td>
              </tr>
              {/* dia chi */}
              <tr>
                <td className="tenDong">Địa chỉ:</td>
                <td className="noiDungDong w-full text-right">
                  {thongTinVe &&
                    thongTinVe.thongTinPhim &&
                    thongTinVe.thongTinPhim.diaChi}
                </td>
              </tr>
              {/* cụm rạp  */}
              <tr>
                <td className="tenDong">Cụm Rạp:</td>
                <td className="noiDungDong w-full text-right">
                  {thongTinVe &&
                    thongTinVe.thongTinPhim &&
                    thongTinVe.thongTinPhim.tenCumRap}
                </td>
              </tr>
              <tr>
                <td className="tenDong font-bold">Tổng số tiền</td>
                <td className="noiDungDong w-full text-right">{giaTicket}</td>
              </tr>
            </tbody>
          </table>
          <div className="w-full">
            <ThanhToan />
          </div>
          <div className="w-full">
            <button
              className="muaVe w-full text-center py-5 uppercase"
              onClick={() => {
                handleBuyTicket();
              }}
            >
              mua vé
            </button>
          </div>
        </div>

        {/* modal */}
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                contentBg: "#e48c04",
                headerBg: "#e48c04",
              },
            },
          }}
        >
          <Modal
            title={[<span className="titleModal text-yellow-100">Sao chưa Đăng Nhập vậy bro??? </span>]}
            open={open}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            footer={[
              <div>
                {/* Nút hủy */}
                <button
                  className="btnConfirm py-2 px-10"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Để Sau nhé
                </button>
                {/* Nút đăng nhập */}
                <button
                  className="btnConfirm py-2 px-10"
                  onClick={() => {
                    handleOk();
                  }}
                >
                  Đăng Nhập
                </button>
              </div>,
            ]}
          >
            {/* Nội dung của Modal */}
            <p>{modalText}</p>
          </Modal>
        </ConfigProvider>
      </div>
    </>
  );
};

export default Cart;
