import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import LichChieuCumRap from "../../layout/LichChieuCumRap/LichChieuCumRap";
// import noiDungChiTiet from "../../layout/noiDungChiTiet/noiDungChiTiet";
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from "../../redux/slice/loadingSlice";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import RandomMovie from "../../layout/randomMovie/RandomMovie";
import NoiDungChiTiett from "../../layout/noiDungChiTiet/NoiDungChiTiett";
import "./_detailMovie.scss";

const DetailMovie = () => {
  const dispatch = useDispatch();
  const { maPhim } = useParams();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    dispatch(handleTurnOnLoading());
    quanLyPhimServ
      .getInforMovie(maPhim)
      .then((res) => {
        // console.log(res.data.content);
        dispatch(handleTurnOffLoading());
        setMovie(res.data.content);
      })
      .catch((err) => {});
  }, [dispatch, maPhim]);
  return (
    <>
      {/* header */}
      <Header />
      {/* banner detail */}
      <div className="BannerDetailMovie w-full overflow-hidden">
        <img src={movie.hinhAnh} className="w-full object-center" alt="" />
      </div>
      {/* content */}
      <div
        className="py-20"
        style={{
          background:
            " linear-gradient(193deg, rgba(255,255,255,1) 0%,#E18604 90%)",
        }}
      >
        <div className="contentChiTiet container">
          <NoiDungChiTiett noiDung={movie} />
          <RandomMovie />
        </div>
      </div>

      <LichChieuCumRap className="w-96" movieDetail={movie.maphim} />
      <Footer className="mt-10" />
    </>
  );
};

export default DetailMovie;
