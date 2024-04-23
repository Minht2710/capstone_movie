import React, { useContext } from "react";
import Header from "../../layout/Header/Header";
import Banner from "../../layout/Banner/Banner";
import ListMovie from "../../layout/ListMovie/ListMovie";
import LichChieuCumRap from "../../layout/LichChieuCumRap/LichChieuCumRap";
// import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import Footer from "../../layout/Footer/Footer";

const HomePage = () => {
  // const notify = useContext(NotifyContext);
  return (
    <div>
      {/* header  */}
      <Header />
      {/* <button
        onClick={() => {
          notify("Tui test thôi");
        }}
      >
        Bấm thử nè
      </button> */}
      {/* banner  */}
      <Banner />

      {/* list movie  */}

      <ListMovie />
      <LichChieuCumRap />
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default HomePage;
