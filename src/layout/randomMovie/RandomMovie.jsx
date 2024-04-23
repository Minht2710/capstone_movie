import React, { useEffect, useState } from "react";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import "./_random.scss";
import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import { Rate } from "antd";

const RandomMovie = () => {
  const navigate = useNavigate();
  const [randomMovie, setRandomMovie] = useState([]);
  useEffect(() => {
    quanLyPhimServ
      .getMoviePage(2)
      .then((res) => {
        const random = getRandomMovies([...res.data.content.items], 5); // Clone mảng trước khi sử dụng
        setRandomMovie(random);
      })
      .catch((err) => {});
  }, []);

  const getRandomMovies = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div className="ngauNhien w-2/6 p-8">
      <div className="p3 relative">
        <h2 className="px-5 py-2 w-fit font-bold rounded-lg bg-white">
          Ngẫu Nhiên
        </h2>
      </div>
      {/* content ngau nhien  */}
      <div className="contentRandomMovie">
        {randomMovie.map((movie) => (
          <div className="itemRandom my-6 flex relative " key={movie.maPhim}>
            {/* content */}
            {/* hinh anh  */}
            <div className="imgContentRd ">
              <img
                src={movie.hinhAnh}
                className="imgRandom w-full h-full"
                alt={movie.tenPhim}
              />
            </div>
            {/* thong tin phim  */}
            <div className="contentRd ml-5  ">
              <h5 className="font-bold pb-2">{movie.tenPhim}</h5>
              <Rate value={movie.danhGia} allowHalf={true} />
              <p className="motTaRandom truncate">{movie.moTa}</p>

              <button
                className="absolute bottom-5 right-5 font-bold"
                onClick={() => {
                  navigate(`/detail/${movie.maPhim}`);
                }}
              >
                Xem thêm <i class="fa-solid fa-square-chevron-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomMovie;
