import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import "./banner.scss";
import { useDispatch } from "react-redux";
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from "../../redux/slice/loadingSlice";
const Banner = () => {
  const dispatch = useDispatch();
  const [arrBanner, setArrBanner] = useState([]);
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    dispatch(handleTurnOnLoading());
    quanLyPhimServ
      .getAllBanner()
      .then((res) => {
        // console.log(res);
        setArrBanner(res.data.content);
        dispatch(handleTurnOffLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleTurnOffLoading());
      });
  }, []);

  return (
    <div className="carousel_banner mb-6">
      <Carousel
        nextArrow={<div>Hello</div>}
        prevArrow={<div>Bye</div>}
        arrows={true}
        afterChange={onChange}
      >
        {arrBanner.map((banner, index) => {
          return (
            <div key={index} className="h-screen-70 ">
              <img className="w-full" src={banner.hinhAnh} alt="" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
