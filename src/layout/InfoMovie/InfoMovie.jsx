import { useSelector } from "react-redux";
import ads from "./../../assets/img/ads.jpg";
import ReactPlayer from "react-player/youtube";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import "./_infoMovie.scss";
// import { useEffect } from "react";

const InfoMovie = () => {
  const navigate = useNavigate();
  // Sử dụng useSelector để lấy thông tin chi tiết phim từ store
  const selectedMovie = useSelector((state) => state.movieSlice.movieDetail);
  console.log(selectedMovie);
  const releaseDate = new Date(selectedMovie.ngayKhoiChieu);
  const day = releaseDate.getDate();
  const month = releaseDate.getMonth() + 1;
  const year = releaseDate.getFullYear();
  const releaseDay = `${day}/${month}/${year}`;

  return selectedMovie && Object.keys(selectedMovie).length === 0 ? (
    <div className="ads lg:m-5 h-full xl:m-5 rounded-3xl overflow-hidden">
      <img src={ads} alt="" className="w-full object-contain" />
    </div>
  ) : (
    <div className="p-5">
      <h3 className="text-center text-3xl font-bold">Thông Tin Phim</h3>
      <div className="trailerMovie p-5">
        <ReactPlayer
          url={selectedMovie.trailer}
          playing={false}
          width={"100%"}
          controls={true}
          style={{
            margin: "auto",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        />
        <div className="infoContent my-5">
          <h4 className="font-bold text-4xl my-5">{selectedMovie.tenPhim}</h4>
          <div className="table-auto">
            {/* nội dung */}
            <tr>
              <td className="w-3/12">
                <span className="font-bold">Nội Dung</span>
              </td>
              <td className="w-1/12">
                <span>:</span>
              </td>
              <td className="w-8/12">
                <p>{selectedMovie.moTa}</p>
              </td>
            </tr>
            {/* release day  */}
            <tr>
              <td className="w-3/12">
                <span className="font-bold">Ngày Khởi Chiếu</span>
              </td>
              <td className="w-1/12">
                <span>:</span>
              </td>
              <td className="w-8/12">
                <p>{releaseDay}</p>
              </td>
            </tr>
            {/* rate */}
            <tr>
              <td className="w-3/12 font-bold">
                <span>Đánh Giá</span>
              </td>
              <td className="w-1/12">
                <span>:</span>
              </td>
              <td className="w-8/12">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={selectedMovie.danhGia / 2}
                />
              </td>
            </tr>
          </div>
          <div className="orderTicket">
            <button
              className="buyTicket"
              onClick={() => {
                navigate(`/detail/${selectedMovie.maPhim}`);
              }}
            >
              Mua vé tại đây
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMovie;
