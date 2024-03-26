import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { quanLyRapServ } from "../../services/quanLyRap";
import LichChieuPhim from "../../components/LichChieuPhim/LichChieuPhim";
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
    <div className="mt-10">
      <h2 className="font-bold text-2xl text-center">
        Danh sách lịch chiếu cụm rạp
      </h2>
      {/* tab lịch chiếu cụm rạp  */}
      <div>
        <Tabs
          tabPosition="left"
          // items={new Array(3).fill(null).map((_, i) => {
          //   const id = String(i + 1);
          //   return {
          //     label: `Tab ${id}`,
          //     key: id,
          //     children: `Content of Tab ${id}`,
          //   };
          // })}
          style={{
            height: "700px",
          }}
          items={arrCumRap.map((cumrap, index) => {
            // console.log(cumrap);
            return {
              label: <img className="w-14" src={cumrap.logo} />,
              key: cumrap.maHeThongRap,
              children: <LichChieuPhim cumrap={cumrap.lstCumRap} />,
            };
          })}
        />
      </div>
    </div>
  );
};

export default LichChieuCumRap;
