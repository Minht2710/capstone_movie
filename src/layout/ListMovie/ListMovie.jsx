import React, { useEffect, useState } from "react";
import { quanLyPhimServ } from "./../../services/quanLyPhim";
import { Badge, Rate, Tabs } from "antd";
import { useDispatch } from "react-redux";
import { setMovieDetail } from "./../../redux/slice/movieSlice";
import InfoMovie from "./../InfoMovie/InfoMovie";
import "./_lstMovie.scss";

const Li = () => {
  const [movieLists, setMovieLists] = useState([]);
  const itemsTitle = ["Gần Đây", "Đánh Giá Cao", "Lượt xem nhiều"];

  const dispatch = useDispatch();
  const handleClickView = (maPhim) => {
    dispatch(setMovieDetail(maPhim));
  };
  // danh sach phim tren Tabs
  useEffect(() => {
    const fetchData = async () => {
      const promises = itemsTitle.map((title, index) =>
        quanLyPhimServ.getMoviePage(index + 1)
      );
      const responses = await Promise.all(promises);
      setMovieLists(responses.map((res) => res.data.content.items));
    };

    fetchData();
  }, []);
  console.log(movieLists);
  return (
    <div className="lstMovieBG py-10" id="listMovie">
      <div
        className="lstMovieBGContent container p-5"
        style={{ height: "auto" }}
      >
        {/* ten danh muc "co gi hot?" */}
        <div className="titleCarousel mx-auto">
          <h3 className="xl:text-7xl xl:my-14 titleListMovie font-bold text-center text-6xl">
            Có gì hot?
          </h3>
        </div>

        <div className="lstMovieBGContent lg:flex items-center my-5">
          {/* chi tiet phim va quang cao */}
          <div className="infoMovie pb-5 xl:w-5/12 lg:w-5/12 h-full">
            <InfoMovie />
          </div>

          {/* danh sach phim */}
          <div className="movieList xl:px-10 xl:w-8/12 lg:w-7/12 md:w-full sm:w-full">
            <div className="">
              <Tabs>
                {itemsTitle.map((title, index) => (
                  <Tabs.TabPane key={index} tab={title}>
                    {/* Hiển thị danh sách phim ở đây */}

                    <div className="tabMovie mt-5">
                      {movieLists[index]?.map((movie) => {
                        // console.log(movie);
                        return (
                          <>
                            <Badge.Ribbon text="Hot" color="red">
                              <div
                                key={movie.maPhim}
                                className="tabItem rounded-2xl overflow-hidden bg-white  relative"
                              >
                                <img
                                  src={movie.hinhAnh}
                                  alt={movie.tenPhim}
                                  className="object-cover h-full"
                                />

                                <div className=" detailMovie absolute top-0 left-0 w-full h-full flex flex-col justify-center items-left p-5">
                                  <div className="chucNang">
                                    <Rate
                                      disabled
                                      allowHalf
                                      defaultValue={movie.danhGia / 2}
                                      // style={{: "width"}}
                                      size="small"
                                    />
                                    <h4 className="font-bold text-left text-cyan-200 my-2">
                                      {movie.tenPhim}
                                    </h4>
                                    <button
                                      onClick={() => {
                                        handleClickView(movie);
                                      }}
                                      className="btnTrailer"
                                    >
                                      <i class="fa-solid fa-play"></i>
                                      Xem trailer
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Badge.Ribbon>
                          </>
                        );
                      })}
                    </div>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Li;
