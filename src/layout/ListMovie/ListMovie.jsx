import React, { useEffect, useState } from "react";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import { useSelector, useDispatch } from "react-redux";
import { getAllMovieThunk, handleAllMovie } from "../../redux/slice/phimSlice";
const ListMovie = () => {
  // const [arrMovie, setArrMovie] = useState([]);
  // có thể coi tham số state đại diện cho object reducer có ở store
  const { arrMovie } = useSelector((state) => state.phimSlice);
  const dispatch = useDispatch();
  // console.log(arrMovie);
  // console.log(phimSlice);
  useEffect(() => {
    // quanLyPhimServ
    //   .getAllMovie()
    //   .then((res) => {
    //     console.log(res);
    //     // setArrMovie(res.data.content);
    //     dispatch(handleAllMovie(res.data.content));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    dispatch(getAllMovieThunk("abc"));
  }, []);

  return (
    <div className="grid grid-cols-5 gap-10">
      {arrMovie.map((movie, index) => {
        return (
          <div className="movie_item space-y-4">
            <img
              className="w-full h-96 object-cover rounded"
              src={movie.hinhAnh}
              alt=""
            />
            <div>
              <h3 className="mb-3">
                <span className="bg-orange-600 text-white rounded py-1 px-2 text-lg font-semibold mr-3">
                  C18
                </span>
                <span className="text-xl font-semibold">{movie.tenPhim}</span>
              </h3>
              <p className="line-clamp-2">{movie.moTa}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListMovie;
