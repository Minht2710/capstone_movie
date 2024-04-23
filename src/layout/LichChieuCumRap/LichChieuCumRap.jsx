import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { quanLyRapServ } from "../../services/quanLyRap";
import LichChieuPhim from "../../components/LichChieuPhim/LichChieuPhim";
import "./_lichChieuCumRap.scss";

const LichChieuCumRap = () => {
  const [arrCumRap, setArrCumRap] = useState([]);
  useEffect(() => {
    quanLyRapServ
      .getAllThongTinCumRap()
      .then((res) => {
        // console.log(res);
        setArrCumRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="listTheaterSchedule py-20" id="lichChieu">
      <div className=" container">
        <h2 className="listTheaterScheduleContent pb-10 font-bold text-4xl text-center">
          Danh sách lịch chiếu cụm rạp
        </h2>
        {/* tab lịch chiếu cụm rạp  */}
        <div className="tabContentSchedule p-5 my-5 outline-dashed outline-1 outline-white">
          <div className="tabContentTheater mx-auto">
            <Tabs
              tabPosition="top"
              style={{
                height: "700px",
              }}
              items={arrCumRap.map((cumrap, index) => {
                // console.log(cumrap);
                return {
                  label: <img className="w-14" src={cumrap.logo} alt="" />,
                  key: cumrap.maHeThongRap,
                  children: <LichChieuPhim cumrap={cumrap.lstCumRap} />,
                };
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LichChieuCumRap;
