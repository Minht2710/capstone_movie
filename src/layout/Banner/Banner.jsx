import React, { useEffect, useState, useRef } from "react";
import { quanLyPhimServ } from "./../../services/quanLyPhim";
import { Carousel } from "antd";
import { useDispatch } from "react-redux";
import "./banner.scss";
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from "../../redux/slice/loadingSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState([]);
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);

  //gọi api từ banner
  useEffect(() => {
    dispatch(handleTurnOnLoading());
    quanLyPhimServ
      .getAllBanner()
      .then((res) => {
        setBanner(res.data.content);
        dispatch(handleTurnOffLoading());
      })
      .catch((err) => {});
  }, []);
  //lấy data movie từ API

  useEffect(() => {
    dispatch(handleTurnOnLoading());
    const moviePromises = banner.map((item) =>
      quanLyPhimServ.getInforMovie(item.maPhim)
    );
    // console.log(moviePromises)
    Promise.all(moviePromises)
      .then((result) => {
        const moviesData = result.map((item) => item.data.content);
        setMovies(moviesData);
        // console.log(moviesData);
        dispatch(handleTurnOffLoading());
      })
      .catch((error) => {});
  }, [dispatch, banner]);

  // console.log(movies);
  // console.log(banner);
  const next = () => {
    carouselRef.current.next();
  };

  const previous = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="banner" id="banner">
      <div className="mx-auto crsWrap overflow-hidden relative z-0">
        <div className="buttonControlSlide absolute top-1/2 left-0 -translate-y-1/2">
          <button onClick={previous}>
            <i className="fa-solid fa-caret-left"></i>
          </button>
        </div>
        <Carousel autoplaySpeed={15000} ref={carouselRef}>
          {banner.map((item) => {
            return (
              <div className="bgbanner block" key={item.maPhim}>
                <img
                  src={item.hinhAnh}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            );
          })}
        </Carousel>
        <div className="buttonControlSlide absolute top-1/2 right-0 -translate-y-1/2">
          <button onClick={next}>
            <i className="fa-solid fa-caret-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
