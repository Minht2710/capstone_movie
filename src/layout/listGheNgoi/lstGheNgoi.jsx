import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLichChieu,
  handleAddToCart,
  handleRemoveCart,
} from "../../redux/slice/muaGheSlice";
import "./_lstGheNgoi.scss";

const LstGheNgoi = () => {
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();
  const lstDatCho = useSelector((state) => state.muaGheSlice.lstChoNgoi);
  const [checkedSeats, setCheckedSeats] = useState([]);

  useEffect(() => {
    dispatch(getLichChieu(maLichChieu));
  }, [dispatch, maLichChieu]);

  const handleCheckBox = (index, ghe) => {
    const newCheckedSeats = [...checkedSeats];
    newCheckedSeats[index] = !newCheckedSeats[index];
    setCheckedSeats(newCheckedSeats);
    if (newCheckedSeats[index]) {
      dispatch(handleAddToCart(ghe));
    } else {
      dispatch(handleRemoveCart(ghe));
    }
  };

  return (
    <div className="list-ghe-ngoi mt-20 grid grid-cols-10">
      {lstDatCho?.danhSachGhe?.map((ghe, index) => {
        return (
          <div className="ghe-ngoi m-1" key={ghe.maGhe}>
            <label className="gheNgoi overflow-hidden px-1 flex flex-col items-center justify-center">
              <div
                className={`chiTietSeat px-5 py-2 rounded-2xl text-center ${
                  ghe.daDat
                    ? "bg-gray-500"
                    : checkedSeats[index]
                    ? "bg-red-500"
                    : "bg-green-400"
                }`}
              >
                <i className="fa-solid fa-couch"></i>
                <p>{ghe.tenGhe}</p>
              </div>
              <input
                type="checkbox"
                checked={checkedSeats[index] || false}
                onChange={() => handleCheckBox(index, ghe)}
                className="hidden opacity-0"
                disabled={ghe.daDat}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default LstGheNgoi;
