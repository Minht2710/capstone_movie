import { Anchor, Rate } from "antd";
import moment from "moment";
import React from "react";
import ReactPlayer from "react-player/youtube";
import "./_noiDung.scss";

const NoiDungChiTiett = ({ noiDung }) => {
  console.log(noiDung);
  return (
    <div className="noi-dung-chi-tiet px-10">
      <div className="tieuDe text-center mb-10 text-4xl font-bold">
        <h2 className="tieuDePhim">{noiDung.tenPhim}</h2>
      </div>

      <div className="noi-dung mb-20">
        {/* hinh anh  */}
        <div className="hinhAnhPhim mr-10 rounded-2xl overflow-hidden">
          <img
            src={noiDung.hinhAnh}
            className=" object-cover h-full w-full"
            alt=""
          />
        </div>
        {/* noi dung ten phim  */}
        <div className="chi-tiet">
          <h3 className="tenPhimChiTiet">{noiDung.tenPhim}</h3>

          {/* danh gia  */}
          <Rate
            value={noiDung.danhGia / 2}
            allowHalf={true}
            disabled
            style={{
              border: "solid 2px black",
              padding: "2px 5px",
              borderRadius: "20px",
              color: "red",
            }}
          />

          {/* noi dung */}
          <div className="movieContent ">
            <span>Nội dung:</span>
            <p>{noiDung.moTa}</p>
          </div>

          {/* ngay khoi chieu */}
          <div className="movieContent ">
            <span>Ngày khởi Chiếu: </span>
            <p>{moment(noiDung.ngayKhoiChieu).format("DD / MM / YYYY")}</p>
          </div>
          <Anchor
            linkPaddingInlineStart={0}
            affix={false}
            items={[
              {
                key: `${noiDung.maPhim}`,
                href: `#okePhim`,
                title: (
                  <button className="font-bold text-2xl bg-slate-500 px-5 py-1 rounded-xl text-white transition-all hover:bg-white hover:text-green-500">
                    Trailer
                  </button>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="trailerYoutube" id="okePhim">
        <ReactPlayer
          url={noiDung.trailer}
          controls={true}
          width="100%"
          height="100%"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
    </div>
  );
};

export default NoiDungChiTiett;
